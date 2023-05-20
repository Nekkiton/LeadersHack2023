import { ReactNode } from "react"
import { Button as BaseButton } from "antd"
import styles from "./Button.module.scss"

interface Props {
  type?: "primary" | "secondary" | "text"
  locked?: boolean
  children?: ReactNode
  className?: string
  onClick?: () => void
}

export default function Button({
  type = "primary",
  locked,
  children,
  className,
  onClick,
}: Props) {
  return (
    <BaseButton
      className={`${styles.button} ${type} ${className}`}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  )
}
