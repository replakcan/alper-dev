'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import routes from '../routes'
import ThemeToggle from './ThemeToggle'
import Wordmark from './Wordmark'
import styles from './Header.module.css'

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Wordmark />

        <nav className={cn(styles.nav, menuOpen && styles.navOpen)} aria-label="Primary navigation">
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
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <button
            className={styles.menuButton}
            type="button"
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className={styles.mobileNavWrap} id="primary-navigation" data-open={menuOpen}>
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {routes.map((route) => {
            const isActive = route.href === '/' ? pathname === route.href : pathname.startsWith(route.href)
            return (
              <Link
                aria-current={isActive ? 'page' : undefined}
                className={cn(styles.mobileLink, isActive && styles.active)}
                key={route.id}
                href={route.href}
                onClick={() => setMenuOpen(false)}
              >
                {route.title}
                <span aria-hidden="true">↗</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
