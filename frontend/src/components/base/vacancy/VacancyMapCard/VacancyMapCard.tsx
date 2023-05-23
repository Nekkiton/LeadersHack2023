import Link from "next/link"
import { VacancyData } from "data/fetchVacancyList"
import Button from "components/base/controls/Button"
import Status from "components/base/vacancy/Status"
import Rating from "components/base/user/UserRating"
import TimesIcon from "assets/icons/times.svg"
import styles from "./VacancyMapCard.module.scss"

interface Props {
  link: string
  className?: string
  onClose?: () => void
  vacancy: VacancyData
}

const userImg = "/images/user.svg"

export default function VacancyMapCard({
  link,
  className,
  onClose,
  vacancy,
}: Props) {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.vacancy}>
        <div className={styles.vacancyHeader}>
          <div className={styles.closeContainer}>
            <p>
              №{vacancy.id} от {vacancy.date}
            </p>
            <TimesIcon className={styles.close} onClick={onClose} />
          </div>
          <Status status={vacancy.status} />
        </div>
        <div className={styles.vacancyInfo}>
          <p className={styles.vacancyName}>{vacancy.title}</p>
          {/* TODO: add department */}
          <p className={styles.vacancyDescription}>{vacancy.company}</p>
          <Rating count={1} averageRate={1.1} />
        </div>
        <div className={styles.vacancyUserContainer}>
          <p className={styles.vacancyUserTitle}>Наставник</p>
          <div className={styles.vacancyUser}>
            <img
              className={styles.vacancyUserImg}
              src={vacancy.mentor.avatar || userImg}
            />
            <div>
              <p className={styles.vacancyUserName}>{vacancy.mentor.name}</p>
              {/* TODO: rating from data */}
              <Rating averageRate={1.5} count={123} />
            </div>
          </div>
        </div>
        <Button className={styles.vacancyResponses} type="text">
          <span>Откликов: {vacancy.responses.count}</span>
          {!!vacancy.responses.countNew && (
            <span className={styles.vacancyResponsesNew}>
              (+{vacancy.responses.countNew} новых)
            </span>
          )}
        </Button>
      </div>
      <Link className={styles.link} href={`${link}/${vacancy.id}`}>
        <Button className={styles.linkBtn}>Подробнее</Button>
      </Link>
    </div>
  )
}
