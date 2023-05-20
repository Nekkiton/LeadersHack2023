import Button from "components/base/controls/Button"
import styles from "./TheHeader.module.scss"
import { ReactComponent as LoginIcon } from "assets/icons/login.svg"
import { ReactComponent as BellIcon } from "assets/icons/bell.svg"
import { ReactComponent as ChevronDownIcon } from "assets/icons/chevron-down.svg"
import logoImg from "assets/images/logo.svg"
import userImg from "assets/images/user.svg"

export default function TheHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img className={styles.logoImg} src={logoImg} />
          <div className={styles.logoName}>
            Карьерный центр стажеров
            <br />
            Правительства Москвы
          </div>
        </div>
        <div className={styles.user}>
          <BellIcon />
          {false ? (
            <Button>
              <span> Войти</span>
              <LoginIcon className="icon" />
            </Button>
          ) : (
            <div className={styles.userProfile}>
              <img className={styles.userImg} src={userImg} />
              <div className={styles.userInfoContainer}>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>Евгений К.</span>
                  <span className={styles.userRole}>Кадровый специалист</span>
                </div>
                <ChevronDownIcon />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
