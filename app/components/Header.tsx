'use client'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import routes from '../routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const headerLinkClassName = cn(
  buttonVariants({ variant: 'link', size: 'sm' }),
  'hover:bg-transparent hover:text-cyan-300 hover:no-underline lg:h-9 lg:gap-1.5 lg:rounded-lg lg:px-2.5 lg:text-sm',
)

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="header navbar-mosaic sticky top-0 z-50 col-span-full row-start-1 flex items-center justify-around border-b border-cyan-300/20 px-4 py-3">
      {routes.map((route) => {
        const isActive = pathname === route.href || pathname.startsWith(`${route.href}/`)

        return (
          <Link
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              headerLinkClassName,
              isActive && 'bg-transparent text-cyan-300 no-underline shadow-none ring-0',
            )}
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
