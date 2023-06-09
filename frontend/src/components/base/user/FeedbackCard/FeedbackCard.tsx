import StarIcon from "assets/icons/star.svg"
import styles from "./FeedbackCard.module.scss"

interface Props {
  className?: string
}

const userImg = "/images/user.svg"

export default function FeedbackCard({ className }: Props) {
  return (
    <div className={`${styles.feedback} ${className}`}>
      <div className={styles.header}>
        <div className={styles.user}>
          <img className={styles.userImg} src={userImg} />
          <p>Марина Высокова</p>
        </div>
        <div className={styles.value}>
          <span>4</span>
          <StarIcon className={styles.valueIcon} />
        </div>
      </div>
      <p>
        Не сразу нашли общий язык, но со временем стали отлично понимать друг
        друга. Юлиана все хорошо объясняет и помогает во всем.
      </p>
    </div>
  )
}
