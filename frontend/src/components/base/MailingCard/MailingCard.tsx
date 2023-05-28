import Link from "next/link"
import styles from "./MailingCard.module.scss"
import { formatDate } from "utils/formatDate"

interface Props {
  link: string
  item: any // TODO: mail type here
}

export default function MailingCard({ item, link }: Props) {
  return (
    <Link className={styles.card} href={`${link}/${item.id}`}>
      <p className={styles.title}>{item.title}</p>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <span className={styles.infoItemTitle}>Отправка:</span>
          <span>{formatDate(item.date, "D MMMM YYYY в hh:mm")}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoItemTitle}>Тип:</span>
          <span>{item.type.join(", ")}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoItemTitle}>Отправка:</span>
          <span>{item.recepient_roles.join(", ")}</span>
        </div>
      </div>
    </Link>
  )
}
