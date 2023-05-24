import { useState } from "react"
import Link from "next/link"
import Button from "components/base/controls/Button"
import BurgerMenu from "components/base/controls/BurgerMenu"
import MobileMenu from "components/layout/MobileMenu"
import LoginIcon from "assets/icons/login.svg"
import LogoutIcon from "assets/icons/logout.svg"
import UserIcon from "assets/icons/user.svg"
import BellIcon from "assets/icons/bell.svg"
import ChevronDownIcon from "assets/icons/chevron-down.svg"
import styles from "./TheHeader.module.scss"

const userImg = "/images/user.svg"
const logoImg = "/images/logo.svg"

export default function TheHeader() {
  const [isMenuShowed, setIsMenuShowed] = useState(false)
  const [isMobileMenuShowed, setIsMobileMenuShowed] = useState(false)

  const logout = () => alert("Выходи пожалуйста")

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link className={styles.logo} href="/">
          <img className={styles.logoImg} src={logoImg} />
          <div className={styles.logoName}>
            Карьерный центр стажеров
            <br />
            Правительства Москвы
          </div>
        </Link>
        <div className={styles.user}>
          <BellIcon />
          {false ? (
            <Button>
              <span> Войти</span>
              <LoginIcon className="icon" />
            </Button>
          ) : (
            <BurgerMenu
              items={[
                <Link href="/profile">
                  <Button type="text">
                    <UserIcon className="icon" />
                    <span>Профиль</span>
                  </Button>
                </Link>,
                <Button
                  className={styles.userLogout}
                  type="text"
                  onClick={logout}
                >
                  <LogoutIcon className="icon" />
                  <span>Выйти</span>
                </Button>,
              ]}
              onChange={setIsMenuShowed}
            >
              <div className={styles.userProfile}>
                <img className={styles.userImg} src={userImg} />
                <div className={styles.userInfoContainer}>
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>Евгений К.</span>
                    <span className={styles.userRole}>Кадровый специалист</span>
                  </div>
                  <ChevronDownIcon
                    className={`${styles.userMenuIcon} ${
                      isMenuShowed ? styles.active : ""
                    }`}
                  />
                </div>
              </div>
            </BurgerMenu>
          )}
        </div>
        <img
          className={`${styles.userImg} ${styles.mobile}`}
          src={userImg}
          onClick={() => setIsMobileMenuShowed(true)}
        />
      </div>
      <MobileMenu
        isShowed={isMobileMenuShowed}
        setIsShowed={setIsMobileMenuShowed}
      />
    </header>
  )
}
