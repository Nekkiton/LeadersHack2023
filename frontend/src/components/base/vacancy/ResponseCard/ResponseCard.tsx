import Link from "next/link"
import UserRating from "components/base/user/UserRating"
import ResponseStatus from "components/base/vacancy/ResponseStatus"
import styles from "./ResponseCard.module.scss"

const userImg = "/images/user.svg"

interface Props {
  link: string
  responseInfo: any
}

export default function ResponseCard({ link, responseInfo }: Props) {
  return (
    <Link className={styles.response} href={`${link}/${responseInfo.id}`}>
      <div className={styles.responseBlock}>
        <ResponseStatus
          className={styles.responseStatus}
          status={responseInfo.status}
        />

        <div className={styles.responseUser}>
          <img
            className={styles.responseUserImg}
            src={responseInfo.avatar ?? userImg}
          />
          <div>
            <p>{responseInfo.name}</p>
            <UserRating
              count={responseInfo.reviews.count}
              averageRate={responseInfo.reviews.averageRate}
            />
          </div>
        </div>
      </div>
      <div className={styles.responseBlock}>
        <p className={styles.responseScore}>{responseInfo.score} баллов</p>
        <p className={styles.responseText}>
          {responseInfo.age} года, {responseInfo.address}
        </p>
        <p className={styles.responseText}>{responseInfo.education}</p>
      </div>
    </Link>
  )
}
