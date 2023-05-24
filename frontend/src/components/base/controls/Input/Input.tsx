import { ReactNode, useState } from "react"
import { DatePicker, TimePicker } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"
import { Input as BaseInput } from "antd"
import CalendarIcon from "assets/icons/calendar.svg"
import ClockIcon from "assets/icons/clock.svg"
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
  password?: boolean
  timepicker?: boolean
  postscript?: string
  notRequired?: boolean
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
  password,
  timepicker,
  postscript,
  notRequired,
}: Props) {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <p className={styles.label}>
          {label}
          {notRequired && (
            <span className={styles.labelHint}> — необязательно</span>
          )}
        </p>
      )}
      {!textarea && !datepicker && !password && !timepicker && (
        <BaseInput
          className={styles.input}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          prefix={prefix}
        />
      )}
      {password && (
        <BaseInput.Password
          className={`${styles.input} ${className}`}
          placeholder={placeholder}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
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
      {timepicker && (
        <TimePicker
          className={`${styles.input} ${className}`}
          value={value}
          onChange={(val) => onChange?.(val)}
          placeholder={placeholder || ""}
          format="HH:mm"
          allowClear={false}
          suffixIcon={<ClockIcon />}
        />
      )}
      {postscript && <p className={styles.postscript}>{postscript}</p>}
    </div>
  )
}
