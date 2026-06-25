import type { Metadata } from 'next'
import ParallaxScene from './components/ParallaxScene'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Alper’s personal website.',
}

export default function Home() {
  return <ParallaxScene />
}
