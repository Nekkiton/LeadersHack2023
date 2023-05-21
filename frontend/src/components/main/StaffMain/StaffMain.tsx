import Link from "next/link"
import VacancyCard from "components/base/vacancy/VacancyCard"
import Button from "components/base/controls/Button"
import DocumentSearchIcon from "assets/icons/document-search.svg"
import StarIcon from "assets/icons/star.svg"
import styles from "./StaffMain.module.scss"

export default function StaffMain() {
  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <h3>Активные вакансии</h3>
        {false ? (
          <div className={`${styles.nothing} ${styles.card}`}>
            <DocumentSearchIcon className={styles.nothingIcon} />
            <p>У вас нет активных вакансий</p>
            <Link href="/staff/vacancies">
              <Button type="secondary">Смотреть все</Button>
            </Link>
          </div>
        ) : (
          <div className={styles.vacancies}>
            <VacancyCard
              vacancy={{
                id: "1902",
                date: "20 иолюя 2023",
                title: "UX/UI дизайнер",
                company: "Карьерный центр Правительства Москвы",
                status: "active",
                mentorName: "Юлиана Митрофанова",
                mentorRole: "Наставник",
                mentorAvatar: null,
                responsesCount: 19,
                responsesCountNew: 5,
              }}
              link="/staff/vacancies"
            />
            <Link href="/staff/vacancies">
              <Button type="secondary">Смотреть все</Button>
            </Link>
          </div>
        )}
      </div>
      <div className={`${styles.block} ${styles.ratingBlock}`}>
        <h3>Рейтинг</h3>
        <div className={`${styles.card} ${styles.ratingCard}`}>
          <div className={styles.ratingValue}>
            <h5>4,8</h5>
            <StarIcon className={styles.ratingIcon} />
          </div>
          <p className={styles.ratingHint}>Лучше, чем у 40% организаций</p>
          <Button type="text">отзывов: 93</Button>
        </div>
      </div>
    </div>
  )
}
