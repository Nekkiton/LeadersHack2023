import { useState } from "react"
import Button from "components/base/controls/Button"
import FeedbacksModal from "components/base/FeedbacksModal"
import StarIcon from "assets/icons/star.svg"
import styles from "./UserRating.module.scss"

interface Props {
  count: number
  averageRate: number
}

export default function UserRating({ count, averageRate }: Props) {
  const [isModalShowed, setIsModalShowed] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.rating}>
        <span>{averageRate}</span>
        <StarIcon className={styles.ratingIcon} />
      </div>
      {/* TODO: if there are feedbacks */}
      {true ? (
        <>
          <Button type="text" onClick={() => setIsModalShowed(true)}>
            отзывов: {count}
          </Button>
          <FeedbacksModal
            isShowed={isModalShowed}
            setIsShowed={setIsModalShowed}
          />
        </>
      ) : (
        <p className={styles.noFeedbacks}>Нет отзывов</p>
      )}
    </div>
  )
}
