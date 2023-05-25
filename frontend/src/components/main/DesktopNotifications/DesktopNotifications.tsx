import { useState } from "react"
import NotificationCard from "components/base/NotificationCard"
import TimesIcon from "assets/icons/times.svg"
import BellIcon from "assets/icons/bell.svg"
import styles from "./DesktopNotifications.module.scss"

export default function DesktopNotifications() {
  const [isShowed, setIsShowed] = useState(false)

  // TODO: fetch data
  const notificationData = {
    date: "12 мая 2023, 11:23",
    title: "Скоро начнется тестирование",
    text: "Не пропусти тестирование. Оно пройдет с 18 по 24 мая. У тебя будет одна попытка и 30 минут времени на его прохождение",
    isNew: true,
  }

  return (
    <div className={styles.container}>
      {/* TODO: active if there are new notifications */}
      <div className={`${styles.iconContainer} ${styles.active}`}>
        <BellIcon className={styles.icon} onClick={() => setIsShowed(true)} />
      </div>
      <span
        className={`${styles.backdrop} ${isShowed ? styles.active : ""}`}
        onClick={() => setIsShowed(false)}
      />
      <div className={`${styles.popup} ${isShowed ? styles.active : ""}`}>
        <div className={styles.header}>
          <h4>Новых уведомлений: 2</h4>
          <TimesIcon
            className={styles.headerIcon}
            onClick={() => setIsShowed(false)}
          />
        </div>
        <div className={styles.notifications}>
          <NotificationCard
            className={styles.notification}
            data={notificationData}
          />
          <NotificationCard
            className={styles.notification}
            data={notificationData}
          />
          <NotificationCard
            className={styles.notification}
            data={notificationData}
          />
          <NotificationCard
            className={styles.notification}
            data={notificationData}
          />
          <NotificationCard
            className={styles.notification}
            data={notificationData}
          />
          <NotificationCard
            className={styles.notification}
            data={{ ...notificationData, isNew: false }}
          />
        </div>
      </div>
    </div>
  )
}
