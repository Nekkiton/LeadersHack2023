import { ReactNode, useState } from "react"
import styles from "./Map.module.scss"

interface Props {
  items?: any[]
  children: (data: any, props: {}) => ReactNode
}

export default function Map({ items = [], children }: Props) {
  const [isCardShowed, setIsCardShowed] = useState(false)
  const [activeItemIdx, setActiveItemIdx] = useState(0)

  return (
    <div className={styles.container}>
      <div className={styles.map}>
        <button onClick={() => setIsCardShowed(true)}>open card</button>
      </div>
      {children(items[activeItemIdx], {
        className: `${styles.card} ${isCardShowed ? styles.active : ""}`,
        onClose: () => setIsCardShowed(false),
      })}
    </div>
  )
}
