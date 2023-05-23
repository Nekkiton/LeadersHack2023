import { useState } from "react"
import { useRouter } from "next/router"
import { notification } from "antd"
import UserRating from "components/base/user/UserRating"
import ResponseStatus from "components/base/vacancy/ResponseStatus"
import Modal from "components/base/controls/Modal"
import PhoneIcon from "assets/icons/phone.svg"
import MailIcon from "assets/icons/mail.svg"
import TrashIcon from "assets/icons/trash.svg"
import TimesIcon from "assets/icons/times.svg"
import styles from "./MentorCard.module.scss"

interface Props {
  link: string
}

const userImg = "/images/user.svg"

export default function UserCard({ link }: Props) {
  const router = useRouter()

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

  const goToMentor = () => router.push(`${link}/1911`)

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        title="Вы уверены, что хотите удалить наставника?"
        onCancel={toggleModal}
        onOk={deleteMentor}
        okText="Удалить"
      />
      <div className={styles.card} onClick={goToMentor}>
        <div className={styles.cardBlock}>
          <ResponseStatus className={styles.cardStatus} status="new" />
          <div className={styles.cardUser}>
            <img className={styles.cardUserImg} src={userImg} />
            <div>
              <p className={styles.cardUserName}>Марина Высокова</p>
              <UserRating count={1} averageRate={4.4} />
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
            <p>+7 (910) 234-56-78</p>
          </div>
          <div className={styles.cardIconBlock}>
            <MailIcon />
            <p>marina@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  )
}
