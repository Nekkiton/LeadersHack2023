import Link from "next/link"
import UserRating from "components/base/user/UserRating"
import styles from "./MentorCard.module.scss"
import PhoneIcon from "assets/icons/phone.svg"
import MailIcon from "assets/icons/mail.svg"
import TrashIcon from "assets/icons/trash.svg"

const userImg = "/images/user.svg"

export default function UserCard() {
  return (
    <Link className={styles.card} href="/staff/mentors/masha">
      <div className={styles.cardBlock}>
        <div className={styles.cardStatus}>
          <span className={styles.cardStatusDot}></span>
          <span>Обучение пройдено</span>
        </div>
        <div className={styles.cardUser}>
          <img className={styles.cardUserImg} src={userImg} />
          <div>
            <p className={styles.cardUserName}>Марина Высокова</p>
            <UserRating />
          </div>
        </div>
      </div>
      <div className={styles.cardBlock}>
        <TrashIcon className={styles.deleteIcon} />
        <div className={styles.cardIconBlock}>
          <PhoneIcon />
          <p>+7 (910) 234-56-78</p>
        </div>
        <div className={styles.cardIconBlock}>
          <MailIcon />
          <p>marina@gmail.com</p>
        </div>
      </div>
    </Link>
  )
}
