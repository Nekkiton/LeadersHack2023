import { notification } from "antd"
import Button from "components/base/controls/Button"
import Popup from "components/base/controls/Popup"
import PhoneIcon from "assets/icons/phone.svg"
import MailIcon from "assets/icons/mail.svg"
import TimesIcon from "assets/icons/times.svg"
import styles from "./InterviewInvite.module.scss"

interface Props {
  isShowed: boolean
  setIsShowed: (val: boolean) => void
  phone: string
  email: string
}

export default function InterviewInviteModal({
  isShowed,
  setIsShowed,
  phone,
  email,
}: Props) {
  // TODO: accept response, handle errors
  const submit = () => {
    setIsShowed(false)
    notification.open({
      message:
        "Собеседование назначено. После его прохождения измените статус отклика на платформе",
      closeIcon: <TimesIcon />,
    })
  }

  return (
    <Popup
      isShowed={isShowed}
      setIsShowed={setIsShowed}
      title="Пригласите стажера на собеседование"
    >
      <p className={styles.text}>
        Выберите удобный способ связи и договоритесь о дате и времени
        собеседования
      </p>
      <div className={styles.contactsContainer}>
        <p className={styles.contactsTitle}>Контакты стажера</p>
        <div className={styles.contacts}>
          <div className={styles.contact}>
            <PhoneIcon className={styles.contactIcon} />
            <p>{phone}</p>
          </div>
          <div className={styles.contact}>
            <MailIcon className={styles.contactIcon} />
            <p>{email}</p>
          </div>
        </div>
      </div>
      <div className="controls">
        <Button
          className="control desktop"
          type="secondary"
          onClick={() => setIsShowed(false)}
        >
          Отмена
        </Button>
        <Button className="control" onClick={submit}>
          Собеседование назначено
        </Button>
      </div>
    </Popup>
  )
}
