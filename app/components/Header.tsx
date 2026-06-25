'use client'

import { cn } from '@/lib/utils'
import routes from '../routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className={styles.header}>
      {routes.map((route) => {
        const isActive = route.href === '/' ? pathname === route.href : pathname.startsWith(route.href)

        return (
          <Link
            aria-current={isActive ? 'page' : undefined}
            className={cn(styles.link, isActive && styles.active)}
            key={route.id}
            href={route.href}
          >
            {route.title}
          </Link>
        )
      })}
    </header>
  )
}
