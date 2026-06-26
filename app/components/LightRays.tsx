'use client'

import { useEffect, useRef, useState } from 'react'
import { Mesh, Program, Renderer, Triangle } from 'ogl'
import styles from './LightRays.module.css'

type RaysOrigin =
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'left'
  | 'right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

type LightRaysProps = {
  className?: string
  raysOrigin?: RaysOrigin
  raysColor?: string
  raysSpeed?: number
  lightSpread?: number
  rayLength?: number
  pulsating?: boolean
  fadeDistance?: number
  saturation?: number
  followMouse?: boolean
  mouseInfluence?: number
  noiseAmount?: number
  distortion?: number
}

type UniformValue = number | [number, number] | [number, number, number]
type Uniforms = Record<string, { value: UniformValue }>

const DEFAULT_COLOR = '#ffffff'

const vertexShader = `
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec2  iResolution;
uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);
  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));
  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;
  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0,
    1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  vec2 finalRayDir = rayDir;

  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  return result
    ? [Number.parseInt(result[1], 16) / 255, Number.parseInt(result[2], 16) / 255, Number.parseInt(result[3], 16) / 255]
    : [1, 1, 1]
}

function getRayAnchor(origin: RaysOrigin, width: number, height: number) {
  switch (origin) {
    case 'top-left':
      return { anchor: [0, -0.2 * height] as [number, number], direction: [0, 1] as [number, number] }
    case 'top-right':
      return { anchor: [width, -0.2 * height] as [number, number], direction: [0, 1] as [number, number] }
    case 'left':
      return { anchor: [-0.2 * width, 0.5 * height] as [number, number], direction: [1, 0] as [number, number] }
    case 'right':
      return { anchor: [1.2 * width, 0.5 * height] as [number, number], direction: [-1, 0] as [number, number] }
    case 'bottom-left':
      return { anchor: [0, 1.2 * height] as [number, number], direction: [0, -1] as [number, number] }
    case 'bottom-center':
      return { anchor: [0.5 * width, 1.2 * height] as [number, number], direction: [0, -1] as [number, number] }
    case 'bottom-right':
      return { anchor: [width, 1.2 * height] as [number, number], direction: [0, -1] as [number, number] }
    default:
      return { anchor: [0.5 * width, -0.2 * height] as [number, number], direction: [0, 1] as [number, number] }
  }
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefersReducedMotion(media.matches)

    update()
    media.addEventListener('change', update)

    return () => media.removeEventListener('change', update)
  }, [])

  return prefersReducedMotion
}

export default function LightRays({
  className,
  raysOrigin = 'top-center',
  raysColor = DEFAULT_COLOR,
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1,
  saturation = 1,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0,
  distortion = 0,
}: Readonly<LightRaysProps>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<Renderer | null>(null)
  const uniformsRef = useRef<Uniforms | null>(null)
  const meshRef = useRef<Mesh | null>(null)
  const animationRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 })
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return

    const container = containerRef.current
    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true })
    rendererRef.current = renderer

    const gl = renderer.gl
    gl.canvas.style.width = '100%'
    gl.canvas.style.height = '100%'

    while (container.firstChild) container.removeChild(container.firstChild)
    container.appendChild(gl.canvas)

    const uniforms: Uniforms = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },
      rayPos: { value: [0, 0] },
      rayDir: { value: [0, 1] },
      raysColor: { value: hexToRgb(raysColor) },
      raysSpeed: { value: raysSpeed },
      lightSpread: { value: lightSpread },
      rayLength: { value: rayLength },
      pulsating: { value: pulsating ? 1 : 0 },
      fadeDistance: { value: fadeDistance },
      saturation: { value: saturation },
      mousePos: { value: [0.5, 0.5] },
      mouseInfluence: { value: mouseInfluence },
      noiseAmount: { value: noiseAmount },
      distortion: { value: distortion },
    }
    uniformsRef.current = uniforms

    const geometry = new Triangle(gl)
    const program = new Program(gl, { vertex: vertexShader, fragment: fragmentShader, uniforms })
    const mesh = new Mesh(gl, { geometry, program })
    meshRef.current = mesh

    const resize = () => {
      const { clientWidth, clientHeight } = container
      const dpr = Math.min(window.devicePixelRatio, 2)
      renderer.dpr = dpr
      renderer.setSize(clientWidth, clientHeight)

      const width = clientWidth * dpr
      const height = clientHeight * dpr
      uniforms.iResolution.value = [width, height]

      const { anchor, direction } = getRayAnchor(raysOrigin, width, height)
      uniforms.rayPos.value = anchor
      uniforms.rayDir.value = direction
    }

    const render = (time: number) => {
      uniforms.iTime.value = time * 0.001

      if (followMouse && mouseInfluence > 0) {
        smoothMouseRef.current.x = smoothMouseRef.current.x * 0.92 + mouseRef.current.x * 0.08
        smoothMouseRef.current.y = smoothMouseRef.current.y * 0.92 + mouseRef.current.y * 0.08
        uniforms.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y]
      }

      renderer.render({ scene: mesh })
      animationRef.current = requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    animationRef.current = requestAnimationFrame(render)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)

      try {
        renderer.gl.getExtension('WEBGL_lose_context')?.loseContext()
        renderer.gl.canvas.parentNode?.removeChild(renderer.gl.canvas)
      } catch {
        // WebGL context cleanup can fail during fast route transitions.
      }

      rendererRef.current = null
      uniformsRef.current = null
      meshRef.current = null
      animationRef.current = null
    }
  }, [
    distortion,
    fadeDistance,
    followMouse,
    lightSpread,
    mouseInfluence,
    noiseAmount,
    prefersReducedMotion,
    pulsating,
    rayLength,
    raysColor,
    raysOrigin,
    raysSpeed,
    saturation,
  ])

  useEffect(() => {
    const uniforms = uniformsRef.current
    const renderer = rendererRef.current
    const container = containerRef.current

    if (!uniforms || !renderer || !container) return

    uniforms.raysColor.value = hexToRgb(raysColor)
    uniforms.raysSpeed.value = raysSpeed
    uniforms.lightSpread.value = lightSpread
    uniforms.rayLength.value = rayLength
    uniforms.pulsating.value = pulsating ? 1 : 0
    uniforms.fadeDistance.value = fadeDistance
    uniforms.saturation.value = saturation
    uniforms.mouseInfluence.value = mouseInfluence
    uniforms.noiseAmount.value = noiseAmount
    uniforms.distortion.value = distortion

    const width = container.clientWidth * renderer.dpr
    const height = container.clientHeight * renderer.dpr
    const { anchor, direction } = getRayAnchor(raysOrigin, width, height)
    uniforms.rayPos.value = anchor
    uniforms.rayDir.value = direction
  }, [
    distortion,
    fadeDistance,
    lightSpread,
    mouseInfluence,
    noiseAmount,
    pulsating,
    rayLength,
    raysColor,
    raysOrigin,
    raysSpeed,
    saturation,
  ])

  useEffect(() => {
    if (!followMouse) return

    const onMouseMove = (event: MouseEvent) => {
      const container = containerRef.current

      if (!container) return

      const bounds = container.getBoundingClientRect()
      mouseRef.current = {
        x: (event.clientX - bounds.left) / bounds.width,
        y: (event.clientY - bounds.top) / bounds.height,
      }
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [followMouse])

  return (
    <div ref={containerRef} className={className ? `${styles.rays} ${className}` : styles.rays} aria-hidden="true" />
  )
}
