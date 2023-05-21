import { ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Button from "components/base/controls/Button"
import styles from "./MenuContainer.module.scss"

interface MenuItem {
  link?: string
  text: string
  icon?: ReactNode
}

interface MenuItemProps {
  item: MenuItem
  children?: ReactNode
}

function MenuItem({ item, children }: MenuItemProps) {
  const router = useRouter()

  const activeClassName = router.pathname === item.link ? styles.active : ""

  if (item.link)
    return (
      <Link className={`${styles.link} ${activeClassName}`} href={item.link}>
        {children}
      </Link>
    )
  return <div className={`${styles.link} ${styles.disabled}`}>{children}</div>
}

interface Props {
  items?: MenuItem[]
  children?: ReactNode
}

export default function MenuContainer({ items = [], children }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        {items.map((item) => (
          <MenuItem item={item} key={item.text + item.link}>
            {item.icon && <span className={styles.linkIcon}>{item.icon}</span>}
            <span>{item.text}</span>
          </MenuItem>
        ))}
      </div>
      <div className={styles.body}>
        {children}
        <Button className={styles.footer} type="text">
          Политика обработки персональных данных
        </Button>
      </div>
    </div>
  )
}
