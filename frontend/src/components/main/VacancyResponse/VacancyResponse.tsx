import Link from "next/link"
import Button from "components/base/controls/Button"
import File from "components/base/controls/File"
import ResponseStatus from "components/base/vacancy/ResponseStatus"
import styles from "./VacancyResponse.module.scss"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import PhoneIcon from "assets/icons/phone.svg"
import MailIcon from "assets/icons/mail.svg"
import UserRating from "components/base/user/UserRating"

const userImg = "/images/user.svg"

export default function VacancyResponse() {
  const user = {
    role: "mentor",
    //role: "staff",
  }

  return (
    <div className={styles.container}>
      <Link href={`/${user.role}/vacancies/piar-manager`}>
        <Button type="text">
          <ChevronLeftIcon className="icon" />
          <span>Вернуться к вакансии</span>
        </Button>
      </Link>
      <div className={styles.header}>
        <div className={styles.user}>
          <img className={styles.userImg} src={userImg} />
          <div className={styles.userInfoContainer}>
            <h1 className={styles.userName}>Марина Высокова</h1>
            <div className={styles.userInfo}>
              <p>22 года, г. Москва</p>
              <UserRating />
            </div>
          </div>
        </div>
        <div className={styles.headerControls}>
          <Button type="secondary">Отклонить</Button>
          <Button>Принять на стажировку</Button>
          {user.role === "mentor" && (
            <Button>Пригласить на собеседование</Button>
          )}
        </div>
      </div>
      <div className={styles.cards}>
        <div className={styles.vCards}>
          <div className={styles.hCards}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>Контакты</p>
              <div className={styles.contact}>
                <PhoneIcon />
                <p>+7 (910) 234-56-78</p>
              </div>
              <div className={styles.contact}>
                <MailIcon />
                <p>marina@gmail.com</p>
              </div>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>График работы</p>
              <p>20 часов в неделю</p>
            </div>
          </div>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Образование</p>
            <div className={styles.education}>
              <p>Московский государственный университет им. М.Ломоносова</p>
              <p>Юридический факультет</p>
              <p>Год выпуска: 2024</p>
            </div>
          </div>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Опыт работы</p>
            <p>
              ООО «Рога и копыта» с мая 2022 по май 2023. Ведение социальных
              сетей, придумывание рекламных креативов АНО «Объединение умов» с
              января по май 2022. Создание контента для пиара мероприятий
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Проектная деятельность</p>
            <p>
              В своём стремлении улучшить пользовательский опыт мы упускаем, что
              базовые сценарии поведения пользователей объективно рассмотрены
              соответствующими инстанциями. Прежде всего,
              социально-экономическое развитие в значительной степени
              обусловливает важность переосмысления.
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardTitle}>О себе</p>
            <p>
              Противоположная точка зрения подразумевает, что сделанные на базе
              интернет-аналитики выводы рассмотрены исключительно в разрезе
              маркетинговых и финансовых предпосылок. Банальные, но
              неопровержимые выводы, а также независимые государства, вне
              зависимости от их уровня.
            </p>
          </div>
        </div>
        <div className={`${styles.card} ${styles.complexCard}`}>
          <div className={styles.complexCardBlock}>
            <p className={styles.cardTitle}>Статус</p>
            <ResponseStatus status="new" />
          </div>
          <div className={styles.statusComment}>
            <p className={styles.statusCommentTitle}>Причина отклонения</p>
            <p>
              Спасибо за ваш отклик. К сожалению, пока что мы не готовы взять
              вас на стажировку.
            </p>
          </div>
          <div className={styles.complexCardBlock}>
            <p className={styles.cardTitle}>Тестовое задание</p>
            <File />
          </div>
          <div className={styles.complexCardBlock}>
            <p className={styles.cardTitle}>Сопроводительное письмо</p>
            <div>
              Добрый день. Я бы очень хотела работать у вас. У меня есть для
              этого необходимый опыт и я знаю, как сделать ваши пресс релизы
              более яркими и интересными.
            </div>
          </div>
          <div>*еще баллы*</div>
        </div>
      </div>
    </div>
  )
}
