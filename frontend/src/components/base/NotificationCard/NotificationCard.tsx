import styles from "./NotificationCard.module.scss"

interface Props {
  className?: string
  data: {
    date: string
    title: string
    text: string
    isNew: boolean
  }
}

export default function NotificationCard({ className, data }: Props) {
  return (
    <div
      className={`${styles.card} ${data.isNew ? styles.new : ""} ${className}`}
    >
      <div className={styles.date}>
        <span className={styles.dateMark} />
        <p>{data.date}</p>
      </div>
      <p className={styles.title}>{data.title}</p>
      <p className={styles.content}>{data.text}</p>
    </div>
  )
}
