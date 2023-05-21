import Button from "components/base/controls/Button"
import styles from "./UserRating.module.scss"
import { ReactComponent as StarIcon } from "assets/icons/star.svg"

export default function UserRating() {
  return (
    <div className={styles.container}>
      <div className={styles.rating}>
        <span>4,7</span>
        <StarIcon className={styles.ratingIcon} />
      </div>
      <Button type="text">24 отзыва</Button>
    </div>
  )
}
