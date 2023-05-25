import { useEffect, useState } from "react"
import Modal from "components/base/controls/Modal"
import Popup from "components/base/controls/Popup"
import FeedbackCard from "components/base/user/FeedbackCard"
import StarIcon from "assets/icons/star.svg"
import styles from "./FeedbacksModal.module.scss"

interface Props {
  isShowed: boolean
  setIsShowed: (val: boolean) => void
}

const userImg = "/images/user.svg"

const FeedbackContent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <img className={styles.userImg} src={userImg} />
        <div>
          <p>Юлиана Митрофанова</p>
          <div className={styles.userRating}>
            <span>4,8</span>
            <StarIcon className={styles.userRatingIcon} />
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <h4>Отзывов: 12</h4>
        <div className={styles.feedbacks}>
          {/* TODO: fetch data */}
          <FeedbackCard />
          <FeedbackCard />
          <FeedbackCard />
        </div>
      </div>
    </div>
  )
}

export default function FeedbacksModal({ isShowed, setIsShowed }: Props) {
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    // IMPORTANT
    if (window.innerWidth <= 400) {
      setIsDesktop(false)
    }
  }, [])

  return (
    <div>
      <Modal
        isOpen={isDesktop && isShowed}
        onCancel={() => setIsShowed(false)}
        onOk={() => setIsShowed(false)}
        cancelText="Закрыть"
      >
        <div className={styles.desktopModalContainer}>
          <h3>Отзывы о наставнике</h3>
          <FeedbackContent />
        </div>
      </Modal>
      <Popup
        className={styles.mobileModal}
        title="Отзывы о наставнике"
        isShowed={isShowed}
        setIsShowed={setIsShowed}
      >
        <FeedbackContent />
      </Popup>
    </div>
  )
}
