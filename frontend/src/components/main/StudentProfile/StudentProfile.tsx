import PhoneIcon from "assets/icons/phone.svg"
import MailIcon from "assets/icons/mail.svg"
import styles from "./StudentProfile.module.scss"

interface Props {
  profile: {
    user: {
      phone: string
      email: string
    }
    education: {
      name: string
      specialty: string
      graduationYear: string
    }
    schedule: string
    experience: string
    projectActivity: string
    about: string
  } // TODO: user object here
}

export default function StudentProfile({ profile }: Props) {
  return (
    <div className={styles.vCards}>
      <div className={styles.hCards}>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Контакты</p>
          <div className={styles.contact}>
            <PhoneIcon />
            <p>{profile.user.phone}</p>
          </div>
          <div className={styles.contact}>
            <MailIcon />
            <p>{profile.user.email}</p>
          </div>
        </div>
        <div className={styles.hCards}>
          <div className={styles.card}>
            <p className={styles.cardTitle}>График работы</p>
            <p>{profile.schedule}</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Направление</p>
            {/* TODO: add profile direction*/}
            <p>Комфортная городская среда</p>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <p className={styles.cardTitle}>Образование</p>
        <div className={styles.education}>
          <p>{profile.education.name}</p>
          <p>{profile.education.specialty}</p>
          <p>Год выпуска: {profile.education.graduationYear}</p>
        </div>
      </div>
      <div className={styles.card}>
        <p className={styles.cardTitle}>Опыт работы</p>
        <p>{profile.experience}</p>
      </div>
      <div className={styles.card}>
        <p className={styles.cardTitle}>Проектная деятельность</p>
        <p>{profile.projectActivity}</p>
      </div>
      <div className={styles.card}>
        <p className={styles.cardTitle}>О себе</p>
        <p>{profile.about}</p>
      </div>
    </div>
  )
}
