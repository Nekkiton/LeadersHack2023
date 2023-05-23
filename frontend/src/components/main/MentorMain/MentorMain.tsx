import Link from "next/link"
import ResponseStatus from "components/base/vacancy/ResponseStatus"
import ResponseCard from "components/base/vacancy/ResponseCard"
import VacancyCard from "components/base/vacancy/VacancyCard"
import Button from "components/base/controls/Button"
import DocumentSearchIcon from "assets/icons/document-search.svg"
import StarIcon from "assets/icons/star.svg"
import LinkIcon from "assets/icons/link-external.svg"
import StudentIcon from "assets/icons/student.svg"
import styles from "./MentorMain.module.scss"

export default function StaffMain() {
  return (
    <div className={styles.container}>
      <div className={styles.blocks}>
        <div className={styles.block}>
          <h3>Активные вакансии</h3>
          {false ? (
            <div className={`${styles.nothing} ${styles.card}`}>
              <DocumentSearchIcon className={styles.nothingIcon} />
              <p>У вас нет активных вакансий</p>
              <Link href="/mentor/vacancies">
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
                  mentor: {
                    id: "1",
                    name: "Юлиана Митрофанова",
                    avatar: null,
                  },
                  responses: {
                    count: 19,
                    countNew: 5,
                  },
                }}
                link="/mentor/vacancies"
              />
              <Link href="/mentor/vacancies">
                <Button type="secondary">Смотреть все</Button>
              </Link>
            </div>
          )}
        </div>
        <div className={styles.block}>
          <h3>Стажеры</h3>
          {false ? (
            <div className={`${styles.nothing} ${styles.card}`}>
              <StudentIcon className={styles.nothingIcon} />
              <p>У вас сейчас нет стажеров</p>
              <Link href="/mentor/interns">
                <Button type="secondary">Смотреть всеx</Button>
              </Link>
            </div>
          ) : (
            <div className={styles.vacancies}>
              <ResponseCard
                link="/mentor/interns"
                responseInfo={{
                  id: "101",
                  status: "new",
                  name: "Марина Высокова",
                  age: "22",
                  score: 20,
                  address: "г. Москва",
                  education: "МГУ им. Ломоносова, выпуск 2023 г.",
                  isNew: true,
                  reviews: {
                    count: 24,
                    averageRate: 4.7,
                  },
                  avatar: null
                }}
              />
              <Link href="/mentor/interns">
                <Button type="secondary">Смотреть всеx</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className={styles.blocks}>
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
        <div className={`${styles.card} ${styles.learning}`}>
          <ResponseStatus status="new" />
          <Button type="text">
            <span>Перейти к обучению</span>
            <LinkIcon className="icon" />
          </Button>
        </div>
      </div>
    </div>
  )
}
