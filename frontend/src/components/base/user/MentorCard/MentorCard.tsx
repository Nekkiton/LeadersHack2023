import { useState } from "react"
import { notification } from "antd"
import UserRating from "components/base/user/UserRating"
import ResponseStatus from "components/base/vacancy/ResponseStatus"
import Modal from "components/base/controls/Modal"
import PhoneIcon from "assets/icons/phone.svg"
import MailIcon from "assets/icons/mail.svg"
import TrashIcon from "assets/icons/trash.svg"
import TimesIcon from "assets/icons/times.svg"
import styles from "./MentorCard.module.scss"
import { MentorData } from "data/fetchMentorList"

interface Props {
  mentorInfo: MentorData
}

const userImg = "/images/user.svg"

export default function UserCard({ mentorInfo }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModal = () => setIsModalOpen((prev) => !prev)

  const startMentorDeleting = (e: MouseEvent) => {
    e.stopPropagation()
    toggleModal()
  }

  // TODO: delete mentor, handle errors
  const deleteMentor = () => {
    toggleModal()
    notification.open({
      message: "Наставник удален",
      closeIcon: <TimesIcon />,
    })
  }

  const status = mentorInfo.status + (!!mentorInfo?.progress ? ` (${mentorInfo.progress}%)` : "");

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        title="Вы уверены, что хотите удалить наставника?"
        onCancel={toggleModal}
        onOk={deleteMentor}
        okText="Удалить"
      />
      <div className={styles.card}>
        <div className={styles.cardBlock}>
          <ResponseStatus className={styles.cardStatus} status={status} />
          <div className={styles.cardUser}>
            <img
              className={styles.cardUserImg}
              src={mentorInfo.avatar ?? userImg}
            />
            <div>
              <p className={styles.cardUserName}>{mentorInfo.name}</p>
              <UserRating
                count={mentorInfo.reviews.count}
                averageRate={mentorInfo.reviews.averageRate}
              />
            </div>
          </div>
        </div>
        <div className={styles.cardBlock}>
          <TrashIcon
            className={styles.deleteIcon}
            onClick={startMentorDeleting}
          />
          <div className={styles.cardIconBlock}>
            <PhoneIcon />
            <p>{mentorInfo.phone}</p>
          </div>
          <div className={styles.cardIconBlock}>
            <MailIcon />
            <p>{mentorInfo.email}</p>
          </div>
        </div>
      </div>
    </>
  )
}
