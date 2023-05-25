import { useState } from "react"
import Pagination from "components/base/navigation/Pagination"
import NotificationCard from "components/base/NotificationCard"
import styles from "./Notifications.module.scss"

export default function Notifications() {
  const [currentPage, setCurrentPage] = useState(1)

  // TODO: fetch data
  const notificationData = {
    date: "12 мая 2023, 11:23",
    title: "Скоро начнется тестирование",
    text: "Не пропусти тестирование. Оно пройдет с 18 по 24 мая. У тебя будет одна попытка и 30 минут времени на его прохождение",
    isNew: true,
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Уведомления</h1>
      <div className={styles.list}>
        <NotificationCard data={notificationData} />
        <NotificationCard data={{ ...notificationData, isNew: false }} />
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={500} // take from data response
      />
    </div>
  )
}
