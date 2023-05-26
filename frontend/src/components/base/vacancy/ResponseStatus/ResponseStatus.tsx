import styles from "./ResponseStatus.module.scss"

interface Props {
  status: string
  className?: string
}

export default function Status({ status, className }: Props) {
  let text = ""
  let color = ""

  if (status === "new") {
    text = "Новый"
    color = "orange"
  } else if (status === "old") {
    text = "Просмотрен"
    color = "gray"
  } else if (status === "interview") {
    text = "Назначено собеседование"
    color = "light-blue"
  } else if (status === "mentorAccepted") {
    text = "Принят наставником"
    color = "purpure"
  } else if (status === "internship") {
    text = "Принят на стажировку"
    color = "green"
  } else if (status === "rejected") {
    text = "Отклонен"
    color = "red"
  } else if (status === "pass_education") {
    // mentor
    text = "Обучение пройдено"
    color = "green"
  } else if (status.startsWith("education")) {
    // mentor
    text = `На обучении${status.replace("education", "")}`
    color = "orange"
  } else {
    text = status
    color = "gray"
  }

  return (
    <div className={`${styles.status} ${styles[color]} ${className}`}>
      <span className={styles.dot}></span>
      <span>{text}</span>
    </div>
  )
}
