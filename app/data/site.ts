type NavItem = {
  readonly id: number
  readonly title: string
  readonly href: string
  readonly description: string
}

type SocialLink = {
  readonly label: string
  readonly href: string
  readonly draft?: boolean
}

export const navigation: readonly NavItem[] = [
  { id: 0, title: 'Home', href: '/', description: 'Home' },
  { id: 1, title: 'About', href: '/about', description: 'About Alper' },
  { id: 2, title: 'Projects', href: '/projects', description: 'Selected projects' },
  { id: 3, title: 'Blog', href: '/blog', description: 'Writing and notes' },
  { id: 4, title: 'Contact', href: '/contact', description: 'Contact Alper' },
]

export const socialLinks: readonly SocialLink[] = [
  { label: 'Email', href: 'mailto:alper.makcan@gmail.com', draft: true },
  { label: 'GitHub', href: 'https://github.com/replakcan', draft: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alpermutluakcan/', draft: true },
]
