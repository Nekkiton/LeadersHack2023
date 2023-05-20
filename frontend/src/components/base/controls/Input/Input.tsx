import { ReactNode } from "react"
import { Input as BaseInput } from "antd"
import styles from "./Input.module.scss"

interface Props {
  prefix?: ReactNode
  value?: string
  onChange?: (val: string) => void
  placeholder?: string
  className?: string
}

export default function Input({
  className,
  prefix,
  value,
  onChange,
  placeholder,
}: Props) {
  return (
    <BaseInput
      className={`${styles.input} ${className}`}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      prefix={prefix}
    />
  )
}
