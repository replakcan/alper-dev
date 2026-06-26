import * as React from 'react'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'
import styles from './button.module.css'

type ButtonVariant = 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link'
type ButtonSize = 'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg'

const variantClasses: Record<ButtonVariant, string> = {
  default: styles.default,
  outline: styles.outline,
  secondary: styles.secondary,
  ghost: styles.ghost,
  destructive: styles.destructive,
  link: styles.link,
}

const sizeClasses: Record<ButtonSize, string> = {
  default: styles.sizeDefault,
  xs: styles.sizeExtraSmall,
  sm: styles.sizeSmall,
  lg: styles.sizeLarge,
  icon: styles.sizeIcon,
  'icon-xs': styles.sizeIconExtraSmall,
  'icon-sm': styles.sizeIconSmall,
  'icon-lg': styles.sizeIconLarge,
}

function buttonVariants({
  variant = 'default',
  size = 'default',
  className,
}: {
  variant?: ButtonVariant | null
  size?: ButtonSize | null
  className?: string
} = {}) {
  return cn(styles.button, variantClasses[variant ?? 'default'], sizeClasses[size ?? 'default'], className)
}

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  )
}

export { Button, buttonVariants }
