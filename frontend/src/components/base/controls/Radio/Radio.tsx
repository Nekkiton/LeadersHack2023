import { ReactNode } from "react"
import styles from "./Radio.module.scss"

interface Props {
  items?: {
    value: any
    content: ReactNode
  }[]
  onChange?: (val: any) => void
  value?: any
  className?: string
  label?: string
}

export default function Checkbox({
  items = [],
  onChange,
  value,
  className,
  label,
}: Props) {
  return (
    <div className={`${styles.container} ${className}`}>
      {label && <p className={styles.label}>{label}</p>}
      <div className={styles.list}>
        {items.map((item) => (
          <div
            className={`${styles.radio} ${
              value === item.value ? styles.active : ""
            }`}
            onClick={() => onChange?.(item.value)}
            key={item.value}
          >
            <span className={styles.marker}></span>
            <span>{item.content}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
