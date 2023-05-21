import Link from "next/link"
import Button from "components/base/controls/Button"
import { VacancyData } from "data/fetchVacancyList"
import styles from "./VacancyCard.module.scss"
import VacancyStatus from "components/base/vacancy/Status"

interface Props {
  vacancy: VacancyData
  noUser?: boolean
}

const userImg = "/images/user.svg"

export default function VacancyCard({ vacancy, noUser }: Props) {
  const user = {
    //role: "staff",
    role: "mentor",
  }

  return (
    <Link
      className={styles.vacancy}
      href={`/${user.role}/vacancies/${vacancy.id}`}
      key={vacancy.id}
    >
      <div className={styles.vacancyHeader}>
        <span>
          №{vacancy.id} от {vacancy.date}
        </span>
        <VacancyStatus
          className={styles.vacancyStatus}
          status={vacancy.status}
        />
      </div>
      <div className={styles.vacancyBody}>
        <div className={styles.vacancyInfo}>
          <p className={styles.vacancyName}>{vacancy.title}</p>
          <p className={styles.vacancyLocation}>{vacancy.company}</p>
        </div>
        {!noUser && (
          <div className={styles.vacancyUser}>
            <img
              className={styles.vacancyUserImg}
              src={vacancy.mentorAvatar || userImg}
            />
            <div className={styles.vacancyUserInfo}>
              <p className={styles.vacancyUserName}>{vacancy.mentorName}</p>
              <p className={styles.vacancyUserRole}>{vacancy.mentorRole}</p>
            </div>
          </div>
        )}
      </div>
      <div className={styles.vacancyResponses}>
        <Button className={styles.vacancyResponsesBtn} type="text">
          <span>Откликов: {vacancy.responsesCount}</span>
          <span className={styles.vacancyResponsesNew}>
            (+{vacancy.responsesCountNew} новых)
          </span>
        </Button>
      </div>
    </Link>
  )
}
