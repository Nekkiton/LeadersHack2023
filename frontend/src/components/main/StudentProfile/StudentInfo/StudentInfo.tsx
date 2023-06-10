import UserRating from "components/base/user/UserRating"
import styles from "./StudentInfo.module.scss"
import dayjs from 'dayjs';

const userImg = "/images/user.svg"

export default function StudentInfo({ profile }: any) {

  const birthday = dayjs(profile.birthday);
  const age = birthday.diff(Date.now(), 'year')
  return (
    <div className={styles.user}>
    <img className={styles.userImg} src={profile.photo ?? userImg} />
    <div className={styles.userInfoContainer}>
      <h1 className={styles.userName}>{profile.name}</h1>
      <div className={styles.userInfo}>
        <p>
          {age} года, {profile.location}
        </p>
        <UserRating
          count={profile.reviews?.count}
          averageRate={profile.reviews?.averageRate}
        />
      </div>
    </div>
  </div>
  )
}
