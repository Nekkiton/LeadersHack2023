import Link from "next/link"
import PhoneIcon from "assets/icons/phone.svg"
import MailIcon from "assets/icons/mail.svg"
import TrashIcon from "assets/icons/trash.svg"
import styles from "./StaffCard.module.scss"

interface Props {
  link: string
}

const userImg = "/images/user.svg"

export default function UserCard({ link }: Props) {
  return (
    <Link className={styles.card} href={`${link}/`}>
      <div className={styles.cardUser}>
        <img className={styles.cardUserImg} src={userImg} />
        <p className={styles.cardUserName}>Марина Высокова</p>
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.cardIconBlock}>
          <PhoneIcon />
          <p>+7 (910) 234-56-78</p>
        </div>
        <div className={styles.cardIconBlock}>
          <MailIcon />
          <p>marina@gmail.com</p>
        </div>
      </div>
      <TrashIcon className={styles.deleteIcon} />
    </Link>
  )
}
