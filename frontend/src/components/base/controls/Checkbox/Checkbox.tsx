import { ReactNode } from "react"
import CheckIcon from "assets/icons/check.svg"
import styles from "./Checkbox.module.scss"

interface Props {
  items?: {
    value: any
    content: ReactNode
  }[]
  onChange?: (val: any) => void
  value?: any[]
  className?: string
  small?: boolean
}

export default function Checkbox({
  items = [],
  onChange,
  value = [],
  className,
  small,
}: Props) {
  const toggleValue = (val: any) => {
    if (value.includes(val)) {
      onChange?.([
        ...value.slice(0, value.indexOf(val)),
        ...value.slice(value.indexOf(val) + 1, value.length),
      ])
    } else {
      onChange?.([...value, val])
    }
  }

  return (
    <div className={`${styles.list} ${className}`}>
      {items.map((item) => (
        <div
          className={`${styles.checkbox} ${
            value.includes(item.value) ? styles.active : ""
          } ${small ? styles.small : ""} `}
          onClick={() => toggleValue(item.value)}
          key={item.value}
        >
          <CheckIcon className={styles.icon} />
          <span>{item.content}</span>
        </div>
      ))}
    </div>
  )
}
