import { cn } from '@/lib/utils'
import styles from './PageContainer.module.css'

type PageContainerProps = React.ComponentPropsWithoutRef<'div'> & {
  reading?: boolean
}

export default function PageContainer({ className, reading = false, ...props }: PageContainerProps) {
  return <div className={cn(styles.container, reading && styles.reading, className)} {...props} />
}
