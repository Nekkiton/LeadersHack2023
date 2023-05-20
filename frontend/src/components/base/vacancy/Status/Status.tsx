import styles from "./Status.module.scss"

interface Props {
  status: string
  className?: string
}

export default function Status({ status, className }: Props) {
  let text = ""

  if (status === "active") {
    text = "Активна"
  } else if (status === "archived") {
    text = "В архиве"
  }

  return (
    <div className={`${styles.status} ${status} ${className}`}>
      <span className={styles.dot}></span>
      <span>{text}</span>
    </div>
  )
}
