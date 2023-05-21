import { ReactNode } from "react"
import { Input as BaseInput } from "antd"
import styles from "./Input.module.scss"

interface Props {
  label?: string
  prefix?: ReactNode
  value?: string
  onChange?: (val: string) => void
  placeholder?: string
  className?: string
  textarea?: boolean
}

export default function Input({
  label,
  className,
  prefix,
  value,
  onChange,
  placeholder,
  textarea,
}: Props) {
  return (
    <div className={styles.container}>
      {label && <p className={styles.label}>{label}</p>}
      {!textarea ? (
        <BaseInput
          className={`${styles.input} ${className}`}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          prefix={prefix}
        />
      ) : (
        <BaseInput.TextArea
          className={`${styles.input} ${styles.textarea} ${className}`}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  )
}
