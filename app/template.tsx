import styles from './template.module.css'

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className={styles.pageTransition}>{children}</div>
}
