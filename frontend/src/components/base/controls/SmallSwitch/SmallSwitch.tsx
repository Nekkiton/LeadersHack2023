import { ReactNode } from "react"
import styles from "./SmallSwitch.module.scss"

interface Props {
  items?: {
    key: any
    value: ReactNode
  }[]
  value?: any
  onChange?: (val: any) => void
  className?: string
}

export default function SmallSwitch({
  items = [],
  value,
  onChange,
  className,
}: Props) {
  return (
    <div className={`${styles.switch} ${className}`}>
      {items.map((item) => (
        <div
          className={`${styles.item} ${
            item.key === value ? styles.active : ""
          }`}
          key={item.key}
          onClick={() => onChange?.(item.key)}
        >
          {item.value}
        </div>
      ))}
    </div>
  )
}
