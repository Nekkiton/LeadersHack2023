import { useState } from "react"
import Pagination from "components/base/navigation/Pagination"
import FeedbackCard from "components/base/user/FeedbackCard"
import CommentIcon from "assets/icons/comment.svg"
import StarIcon from "assets/icons/star.svg"
import styles from "./ProfileFeedbacks.module.scss"

export default function ProfileFeedbacks() {
  // TODO: fetch data or get data from params

  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className={styles.container}>
      {/* TODO: show if no data */}
      {false ? (
        <div className={styles.nothing}>
          <CommentIcon className={styles.nothingIcon} />
          <div className={styles.nothingText}>
            <h3>Отзывов еще нет</h3>
            <p className={styles.nothingTextHint}>
              Они появятся после того, как ты пройдешь стажировку
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.feedbacks}>
            <h3>Отзывов: 12</h3>
            <div className={styles.feedbacksList}>
              <FeedbackCard className={styles.feedbacksFeedback} />
              <FeedbackCard className={styles.feedbacksFeedback} />
              <FeedbackCard className={styles.feedbacksFeedback} />
            </div>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalItems={10}
            />
          </div>
          <div className={styles.ratingContainer}>
            <h3>Рейтинг</h3>
            <div className={styles.ratingCard}>
              <div className={styles.ratingValue}>
                <h5>4,8</h5>
                <StarIcon className={styles.ratingIcon} />
              </div>
              <p className={styles.ratingHint}>Лучше, чем у 40% стажеров</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
