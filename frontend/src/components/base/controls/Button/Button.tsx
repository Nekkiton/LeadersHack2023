import { ReactNode } from "react"
import { Button as BaseButton } from "antd"
import styles from "./Button.module.scss"

interface Props {
  type?: "primary" | "secondary" | "text"
  disabled?: boolean
  children?: ReactNode
  className?: string
  onClick?: () => void
  htmlType?: "button" | "submit" | "reset"
}

export default function Button({
  type = "primary",
  disabled,
  children,
  className,
  onClick,
  htmlType,
}: Props) {
  return (
    <BaseButton
      className={`${styles.button} ${type} ${className}`}
      onClick={onClick}
      htmlType={htmlType}
      disabled={disabled}
    >
      {children}
    </BaseButton>
  )
}
