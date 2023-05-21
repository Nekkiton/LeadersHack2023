import { Link } from "react-router-dom"
import Button from "components/base/controls/Button"
import UserRating from "components/base/user/UserRating"
import VacancyResponses from "components/base/vacancy/Responses"
import styles from "./Vacancy.module.scss"
import { ReactComponent as ChevronLeftIcon } from "assets/icons/chevron-left.svg"
import { ReactComponent as CopyIcon } from "assets/icons/copy.svg"
import { ReactComponent as PenIcon } from "assets/icons/pen.svg"
import { ReactComponent as LinkExternalIcon } from "assets/icons/link-external.svg"
import { ReactComponent as DocumentIcon } from "assets/icons/document2.svg"
import userImg from "assets/images/user.svg"

export default function Vacancy() {
  const statuses = {
    created: "Создана",
    testTask: "Добавление тестового задания",
    moderating: "На модерации",
    active: "Активна",
    archived: "В архиве",
  } as {
    [key: string]: string
  }

  return (
    <div className={styles.vacancy}>
      <Link className={styles.topLink} to="/staff/vacancies">
        <Button type="text">
          <ChevronLeftIcon className="icon" />
          <span>Вернуться к вакансиям</span>
        </Button>
      </Link>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Пиар-менеджер</h1>
        <div className={styles.headerControls}>
          <Button type="text">
            <CopyIcon className="icon" />
            <span>Создать копию</span>
          </Button>
          <Button type="secondary">
            <PenIcon className="icon" />
            <span>Редактировать</span>
          </Button>
        </div>
      </div>
      <div className={styles.organization}>
        <p className={styles.organizationName}>
          АНО «Проектный офис по развитию туризма и гостеприимства Москвы»,
          пресс-центр
        </p>
        <div className={styles.organizationInfo}>
          <div className={styles.organizationAddress}>
            <span className={styles.organizationAddressDot}></span>
            <span>Калужская, ул. Большая Дмитровка, 7/5</span>
          </div>
          <UserRating />
        </div>
      </div>
      <div className={styles.cards}>
        <div className={styles.responsesContainer}>
          <div className={styles.vCards}>
            <div className={styles.hCards}>
              <div className={styles.card}>
                <p className={styles.cardTitle}>Наставник</p>
                <div className={styles.mentor}>
                  <img className={styles.mentorImg} src={userImg} />
                  <div>
                    <p>Юлиана Митрофанова</p>
                    <UserRating />
                  </div>
                </div>
              </div>
              <div className={styles.card}>
                <p className={styles.cardTitle}>Даты стажировки</p>
                <p>1 августа — 30 сентября</p>
              </div>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>Описание</p>
              <p>
                Прежде всего, постоянное информационно-пропагандистское
                обеспечение нашей деятельности, в своём классическом
                представлении, допускает внедрение приоретизации разума над
                эмоциями. Таким образом, сплочённость команды профессионалов, а
                также свежий взгляд на привычные вещи — безусловно открывает
                новые горизонты для укрепления.
              </p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>Тестовое задание</p>
              <p>
                Тут краткое описание текстового задания и может быть добавлена
                ссылка, например, https://lk.leaders2023.innoagency.ru/todo и
                файл.
              </p>
              <div className={styles.file}>
                <div className={styles.fileNameContainer}>
                  <DocumentIcon className={styles.fileIcon} />
                  <span>Document_name... .pdf</span>
                </div>
                <span className={styles.fileSize}>2 Mb</span>
              </div>
            </div>
          </div>
          <VacancyResponses />
        </div>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Статус</p>
          <div className={styles.timeline}>
            {Object.keys(statuses).map((status) => (
              <div
                className={`${styles.timelineItem} ${
                  status === "created" ? styles.past : ""
                } ${status === "testTask" ? styles.active : ""}`}
                key={status}
              >
                <span className={styles.timelineDot}></span>
                <span>{statuses[status]}</span>
              </div>
            ))}
          </div>
          <div className={styles.statusComment}>
            <p className={styles.statusCommentTitle}>Причина отклонения</p>
            <p className={styles.statusCommentText}>
              У вас уже создана аналогичная вакансия на выбранные даты. Укажите
              другие сроки стажировки или измените данные вакансии и подайте
              заявку повторно.
            </p>
          </div>
          <Button type="text">
            <span>Подробнее о смене статусов</span>
            <LinkExternalIcon className="icon" />
          </Button>
        </div>
      </div>
    </div>
  )
}
