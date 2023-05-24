import { ReactNode } from "react"
import TimesIcon from "assets/icons/times.svg"
import styles from "./Popup.module.scss"

interface Props {
  isShowed: boolean
  setIsShowed: (val: boolean) => void
  title: string
  children?: ReactNode
}

export default function Popup({
  isShowed,
  setIsShowed,
  title,
  children,
}: Props) {
  return (
    <div className={`${styles.container} ${isShowed ? styles.active : ""}`}>
      <span className={styles.backdrop} />
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <h5>{title}</h5>
          <TimesIcon
            className={styles.popupHeaderIcon}
            onClick={() => setIsShowed(false)}
          />
        </div>
        {children}
      </div>
    </div>
  )
}
