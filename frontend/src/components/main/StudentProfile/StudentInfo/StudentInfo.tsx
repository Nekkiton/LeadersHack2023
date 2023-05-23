import UserRating from "components/base/user/UserRating"
import styles from "./StudentInfo.module.scss"

interface Props {
  profile: {
    avatar: string
    age: string
    name: string
    address: string
    reviews: {
      count: number
      averageRate: number
    }
  } // TODO: user object here
}

const userImg = "/images/user.svg"

export default function StudentInfo({ profile }: any) {
  return (
    <div className={styles.user}>
    <img className={styles.userImg} src={profile.avatar ?? userImg} />
    <div className={styles.userInfoContainer}>
      <h1 className={styles.userName}>{profile.name}</h1>
      <div className={styles.userInfo}>
        <p>
          {profile.age} года, {profile.address}
        </p>
        <UserRating
          count={profile.reviews.count}
          averageRate={profile.reviews.averageRate}
        />
      </div>
    </div>
  </div>
  )
}
