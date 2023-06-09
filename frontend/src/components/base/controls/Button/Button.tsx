import { MouseEventHandler } from "react"
import { CSSProperties, ReactNode } from "react"
import { Button as BaseButton } from "antd"
import styles from "./Button.module.scss"

interface Props {
  type?: "primary" | "secondary" | "text"
  disabled?: boolean
  children?: ReactNode
  className?: string
  onClick?: MouseEventHandler<any>
  htmlType?: "button" | "submit" | "reset"
  style?: CSSProperties
  href?: string
}

export default function Button({
  type = "primary",
  disabled,
  children,
  className,
  onClick,
  htmlType,
  style,
  href,
}: Props) {
  return (
    <BaseButton
      className={`${styles.button} ${type} ${className}`}
      onClick={onClick}
      htmlType={htmlType}
      disabled={disabled}
      style={style}
      href={href}
    >
      {children}
    </BaseButton>
  )
}
