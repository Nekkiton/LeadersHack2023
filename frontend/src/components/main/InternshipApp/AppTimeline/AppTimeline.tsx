import React from "react"
import styles from "./AppTimeline.module.scss"
import { ApplicationStatus } from "models/InternshipApplication"

const statusTitles: Record<ApplicationStatus, string> = {
  [ApplicationStatus.created]: "Заявка принята",
  [ApplicationStatus.moderation]: "На модерации",
  [ApplicationStatus.training]: "Обучение",
  [ApplicationStatus.examination]: "Тестирование",
  [ApplicationStatus.championship]: "Кейс-чемпионат",
  [ApplicationStatus.completed]: "Заявка одобрена",
}

const statusList = [
  ApplicationStatus.created,
  ApplicationStatus.moderation,
  ApplicationStatus.training,
  ApplicationStatus.examination,
  ApplicationStatus.championship,
  ApplicationStatus.completed,
]

interface Props {
  activeStatus: ApplicationStatus
}

export default function AppTimeline({ activeStatus }: Props) {
  return (
    <div className={styles.timeline}>
      {statusList.map((item, index) => (
        <div
          className={`${styles.timelineItem} ${
            index < statusList.indexOf(activeStatus) ? styles.past : ""
          } ${item === activeStatus ? styles.active : ""}`}
          key={item}
        >
          <span className={styles.timelineItemMark}></span>
          <p>{statusTitles[item]}</p>
        </div>
      ))}
    </div>
  )
}
