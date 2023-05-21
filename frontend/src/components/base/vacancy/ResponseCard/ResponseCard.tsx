import Link from "next/link"
import UserRating from "components/base/user/UserRating"
import ResponseStatus from "components/base/vacancy/ResponseStatus"
import styles from "./ResponseCard.module.scss"

const userImg = "/images/user.svg"

export default function ResponseCard() {
  const user = {
    role: "mentor",
    //role: "staff",
  }

  return (
    <Link
      className={styles.response}
      href={`/${user.role}/vacancies/piar-manager/responses/masha`}
    >
      <div className={styles.responseBlock}>
        <ResponseStatus className={styles.responseStatus} status="new" />

        <div className={styles.responseUser}>
          <img className={styles.responseUserImg} src={userImg} />
          <div>
            <p>Марина Высокова</p>
            <UserRating />
          </div>
        </div>
      </div>
      <div className={styles.responseBlock}>
        <p className={styles.responseScore}>20 баллов</p>
        <p className={styles.responseText}>22 года, г. Москва</p>
        <p className={styles.responseText}>
          МГУ им. Ломоносова, выпуск 2023 г.
        </p>
      </div>
    </Link>
  )
}
