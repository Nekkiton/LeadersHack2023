import { useState, ReactNode } from "react"
import styles from "./BurgerMenu.module.scss"

interface Props {
  items?: ReactNode[]
  children?: ReactNode
  onChange?: (val: boolean) => void
}

export default ({ items = [], children, onChange }: Props) => {
  const [isShowed, setIsShowed] = useState(false)

  const changeIsShowed = (val: boolean) => {
    onChange?.(val)
    setIsShowed(val)
  }

  return (
    <div className={`${styles.container} ${isShowed ? styles.active : ""}`}>
      <div onClick={() => changeIsShowed(!isShowed)}>{children}</div>
      <div
        className={styles.backdrop}
        onClick={() => changeIsShowed(false)}
      ></div>
      <div className={styles.items}>
        {items.map((item, idx) => (
          <div className={styles.item} key={idx}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
