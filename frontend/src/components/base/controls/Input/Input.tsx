import { ReactNode } from "react"
import { DatePicker } from "antd"
import { Input as BaseInput } from "antd"
import CalendarIcon from "assets/icons/calendar.svg"
import styles from "./Input.module.scss"

interface Props {
  label?: string
  prefix?: ReactNode
  value?: any
  onChange?: (val: any) => void
  placeholder?: string
  className?: string
  textarea?: boolean
  datepicker?: boolean
  postscript?: string
}

export default function Input({
  label,
  className,
  prefix,
  value,
  onChange,
  placeholder,
  textarea,
  datepicker,
  postscript,
}: Props) {
  return (
    <div className={styles.container}>
      {label && <p className={styles.label}>{label}</p>}
      {!textarea && !datepicker && (
        <BaseInput
          className={`${styles.input} ${className}`}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          prefix={prefix}
        />
      )}
      {textarea && (
        <BaseInput.TextArea
          className={`${styles.input} ${styles.textarea} ${className}`}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
        />
      )}
      {datepicker && (
        <DatePicker
          className={`${styles.input} ${className}`}
          value={value}
          onChange={(val) => onChange?.(val)}
          placeholder={placeholder || ""}
          allowClear={false}
          suffixIcon={<CalendarIcon />}
          format={"DD.MM.YYYY"}
        />
      )}
      {postscript && <p className={styles.postscript}>{postscript}</p>}
    </div>
  )
}
