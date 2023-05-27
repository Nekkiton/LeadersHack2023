import { useState } from "react"
import Link from "next/link"
import Button from "components/base/controls/Button"
import BurgerMenu from "components/base/controls/BurgerMenu"
import MobileMenu from "components/layout/MobileMenu"
import DesktopNotifications from "components/main/DesktopNotifications"
import LoginIcon from "assets/icons/login.svg"
import LogoutIcon from "assets/icons/logout.svg"
import UserIcon from "assets/icons/user.svg"
import ChevronDownIcon from "assets/icons/chevron-down.svg"
import styles from "./TheHeader.module.scss"
import { useQuery } from "@tanstack/react-query"
import { fetchUserInfo } from "data"
import { Spin } from "antd"

const userImg = "/images/user.svg"
const logoImg = "/images/logo.svg"

export default function TheHeader() {
  const [isMenuShowed, setIsMenuShowed] = useState(false)
  const [isMobileMenuShowed, setIsMobileMenuShowed] = useState(false)

  const logout = () => alert("Выходи пожалуйста");
  const notificationsCount = 1; // TODO: get from notification endpoint

  const { data, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => fetchUserInfo(),
  })

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
          <DesktopNotifications notificationsCount={notificationsCount} />
          {/* TODO: show if user is not authed */}
          {false ? (
            <Link href="/login">
              <Button>
                <span> Войти</span>
                <LoginIcon className="icon" />
              </Button>
            </Link>
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
                <img className={styles.userImg} src={data?.photo || userImg} />
                <div className={styles.userInfoContainer}>
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>
                      {data?.name} {data?.surname?.charAt(0)}.
                    </span>
                    <span className={styles.userRole}>{data?.role}</span>
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
        {/* TODO: if user is not authed */}
        {false ? (
          <Link className={styles.mobileBtn} href="/login">
            <Button>
              <LoginIcon className="icon" />
            </Button>
          </Link>
        ) : (
          <div className={`${styles.mobileUserImgContainer} ${styles.marked}`}>
            {/* TODO: marked if there are new notifications */}
            <img
              className={styles.userImg}
              src={data?.photo || userImg}
              onClick={() => setIsMobileMenuShowed(true)}
            />
          </div>
        )}
      </div>
      <MobileMenu
        isShowed={isMobileMenuShowed}
        setIsShowed={setIsMobileMenuShowed}
        user={data}
      />
    </header>
  )
}
