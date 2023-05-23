import React from "react"
import styles from "./Timeline.module.scss"

const base_statuses = {
  created: "Создана",
  testTask: "Добавление тестового задания",
  moderating: "На модерации",
  active: "Активна",
  archived: "В архиве",
} as {
  [key: string]: string
}

export default function Timeline({ statuses, activeStatus }: any) {

  return (
      <div className={styles.timeline}>
        {Object.keys(statuses).map((status) => (
          <div
            className={`${styles.timelineItem} ${
              status === "created" ? styles.past : ""
            } ${status === activeStatus ? styles.active : ""}`}
            key={status}
          >
            <span className={styles.timelineDot}></span>
            <span>{statuses[status]}</span>
          </div>
        ))}
      </div>
  )
}
