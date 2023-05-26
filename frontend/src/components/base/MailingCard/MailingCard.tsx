import Link from "next/link"
import styles from "./MailingCard.module.scss"
import dayjs from "dayjs"
import "dayjs/locale/ru";

interface Props {
  link: string
  item: any // TODO: mail type here
}

export default function MailingCard({ item, link }: Props) {
  return (
    <Link className={styles.card} href={`${link}/${item.id}`}>
      <p className={styles.title}>
        {item.title}
      </p>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <span className={styles.infoItemTitle}>Отправка:</span>
          <span>{dayjs(item.date).locale("ru").format('D MMMM YYYY в hh:mm')}</span>
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
