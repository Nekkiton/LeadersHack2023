import styles from "./Status.module.scss"

interface Props {
  status: string
  className?: string
}

export default function Status({ status, className }: Props) {
  let text = ""
  let color = ""

  //if (status === "created") {
  //text = "Создана"
  //} else
  if (status === "testTask") {
    text = "Добавление тестового задания"
    color = "light-blue"
  } else if (status === "moderating") {
    text = "На модерации"
    color = "orange"
  } else if (status === "active") {
    text = "Активна"
    color = "green"
  } else if (status === "rejected") {
    text = "Отклонена"
    color = "red"
  } else if (status === "archived") {
    text = "В архиве"
    color = "gray"
  } else if (status === "studying") {
    text = "Проходит обучение"
    color = "gray"
  } else if (status === "finishedTesting") {
    text = "Прошел тестирование"
    color = "purpure"
  } else if (status === "case") {
    text = "Проходит кейс-чемпионат"
    color = "light-blue"
  } else if (status === "internship") {
    text = "Отобран на стажировку"
    color = "green"
  } else if (status === "responsed") {
    text = "Я откликнулся"
    color = "purpure"
  }

  return (
    <div className={`${styles.status} ${styles[color]} ${className}`}>
      <span className={styles.dot}></span>
      <span>{text}</span>
    </div>
  )
}
