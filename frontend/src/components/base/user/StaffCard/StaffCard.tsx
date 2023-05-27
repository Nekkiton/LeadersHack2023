import { useState } from "react"
import { notification } from "antd"
import Modal from "components/base/controls/Modal"
import PhoneIcon from "assets/icons/phone.svg"
import MailIcon from "assets/icons/mail.svg"
import TrashIcon from "assets/icons/trash.svg"
import TimesIcon from "assets/icons/times.svg"
import styles from "./StaffCard.module.scss"

const userImg = "/images/user.svg"

export default function StaffCard() {
  const [isModalShowed, setIsModalShowed] = useState(false)

  // TODO: send request
  const deleteStaff = () => {
    setIsModalShowed(false)
    notification.open({
      message: "Кадровый специалист удален",
      closeIcon: <TimesIcon />,
    })
  }

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardUser}>
          <img className={styles.cardUserImg} src={userImg} />
          <p className={styles.cardUserName}>Марина Высокова</p>
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardIconBlock}>
            <PhoneIcon />
            <p>+7 (910) 234-56-78</p>
          </div>
          <div className={styles.cardIconBlock}>
            <MailIcon />
            <p>marina@gmail.com</p>
          </div>
        </div>
        <TrashIcon
          className={styles.deleteIcon}
          onClick={() => setIsModalShowed(true)}
        />
      </div>

      <Modal
        isOpen={isModalShowed}
        title="Вы уверены, что хотите удалить кадрового специалиста?"
        okText="Удалить"
        cancelText="Отмена"
        onOk={deleteStaff}
        onCancel={() => setIsModalShowed(false)}
      />
    </>
  )
}
