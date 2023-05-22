import Link from "next/link"
import styles from "./MailingCard.module.scss"

interface Props {
  link: string
}

export default function MailingCard({ link }: Props) {
  return (
    <Link className={styles.card} href={`${link}/123`}>
      <p className={styles.title}>
        Тестирование кандидатов пройдет с 10 по 17 мая
      </p>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <span className={styles.infoItemTitle}>Отправка:</span>
          <span>2 февраля 2023 в 11:00</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoItemTitle}>Тип:</span>
          <span>e-mail, push</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoItemTitle}>Отправка:</span>
          <span>кандидаты</span>
        </div>
      </div>
    </Link>
  )
}
