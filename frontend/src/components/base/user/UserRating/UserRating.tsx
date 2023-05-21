import Button from "components/base/controls/Button"
import styles from "./UserRating.module.scss"
import StarIcon from "assets/icons/star.svg"

interface Props {
  count: number
  averageRate: number
}

export default function UserRating({ count, averageRate }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.rating}>
        <span>{averageRate}</span>
        <StarIcon className={styles.ratingIcon} />
      </div>
      <Button type="text">отзывов: {count}</Button>
    </div>
  )
}
