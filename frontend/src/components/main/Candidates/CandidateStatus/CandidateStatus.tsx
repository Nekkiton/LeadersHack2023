import { ApplicationStatus } from "models/InternshipApplication"
import styles from "./CandidateStatus.module.scss"

const statusTitles: Record<ApplicationStatus, string> = {
  [ApplicationStatus.created]: "Заявка принята",
  [ApplicationStatus.moderation]: "На модерации",
  [ApplicationStatus.training]: "Проходит обучение",
  [ApplicationStatus.examination]: "Прошел тестирование",
  [ApplicationStatus.championship]: "Проходит кейс-чемпионат",
  [ApplicationStatus.completed]: "Отобран на стажировку",
  [ApplicationStatus.rejected]: "Отклонен",
}

const statusColors: Record<ApplicationStatus, string> = {
  [ApplicationStatus.created]: "gray",
  [ApplicationStatus.moderation]: "orange",
  [ApplicationStatus.training]: "gray",
  [ApplicationStatus.examination]: "purpure",
  [ApplicationStatus.championship]: "light-blue",
  [ApplicationStatus.completed]: "green",
  [ApplicationStatus.rejected]: "red",
}

interface Props {
  status: ApplicationStatus
}

export default function Status({ status }: Props) {
  return (
    <div className={`${styles.status} ${styles[statusColors[status]]}`}>
      <span className={styles.dot}></span>
      <span>{statusTitles[status]}</span>
    </div>
  )
}
