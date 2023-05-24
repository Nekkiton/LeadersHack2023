import { ReactNode } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import styles from "./MobileMenuContainer.module.scss"

interface Props {
  items: {
    title: string
    link: string
    icon: ReactNode
  }[]
  children?: ReactNode
}

export default function MobileMenuContainer({ items, children }: Props) {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
      <div className={styles.menu}>
        {items.map((item) => (
          <Link
            className={`${styles.item} ${
              router.pathname === item.link ? styles.active : ""
            }`}
            key={item.title + item.link}
            href={item.link}
          >
            <div className={styles.icon}>{item.icon}</div>
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
