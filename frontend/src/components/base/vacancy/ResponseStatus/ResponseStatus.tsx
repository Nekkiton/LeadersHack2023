import styles from "./ResponseStatus.module.scss"

interface Props {
  status: string
  className?: string
}

export default function Status({ status, className }: Props) {
  let text = ""

  if (status === "new") {
    text = "Новый"
  } else if (status === "old") {
    text = "Просмотрен"
  }

  return (
    <div className={`${styles.status} ${status} ${className}`}>
      <span className={styles.dot}></span>
      <span>{text}</span>
    </div>
  )
}
