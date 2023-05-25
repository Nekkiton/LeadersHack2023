import { ReactNode } from "react"
import TimesIcon from "assets/icons/times.svg"
import styles from "./Popup.module.scss"

interface Props {
  isShowed: boolean
  setIsShowed: (val: boolean) => void
  title: ReactNode
  children?: ReactNode
  onClose?: () => void
}

export default function Popup({
  isShowed,
  setIsShowed,
  title,
  children,
  onClose,
}: Props) {
  const close = () => {
    setIsShowed(false)
    onClose?.()
  }

  return (
    <div className={`${styles.container} ${isShowed ? styles.active : ""}`}>
      <span className={styles.backdrop} onClick={close} />
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <h5>{title}</h5>
          <TimesIcon className={styles.popupHeaderIcon} onClick={close} />
        </div>
        {children}
      </div>
    </div>
  )
}
