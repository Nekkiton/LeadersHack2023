import { ReactNode } from "react"
import styles from "./Map.module.scss"

interface Props {
  items?: any[]
  card: ReactNode
}

export default function Map({ items = [], card }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.map}>Map is coming soon</div>
    </div>
  )
}
