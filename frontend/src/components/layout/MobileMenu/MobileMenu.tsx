import Link from "next/link"
import Button from "components/base/controls/Button"
import TimesIcon from "assets/icons/times.svg"
import StarIcon from "assets/icons/star.svg"
import DocumentIcon from "assets/icons/document.svg"
import UserIcon from "assets/icons/user.svg"
import BellIcon from "assets/icons/bell.svg"
import BoxIcon from "assets/icons/box.svg"
import OrderIcon from "assets/icons/order.svg"
import styles from "./MobileMenu.module.scss"

interface Props {
  isShowed: boolean
  setIsShowed: (val: boolean) => void
  user: any // user model here
}

const userImg = "/images/user.svg"
const logoImg = "/images/logo.svg"

// mobile menu for candidate or intern
export default function MobileMenu({ isShowed, setIsShowed, user }: Props) {
  
  // user.role = "intern";

  return (
    <div className={`${styles.container} ${isShowed ? styles.active : ""}`}>
      <div className={styles.header}>
        <Link className={styles.logo} href="/">
          <img className={styles.logoImg} src={logoImg} />
          <div className={styles.logoName}>
            Карьерный центр стажеров
            <br />
            Правительства Москвы
          </div>
        </Link>
        <TimesIcon
          className={styles.closeIcon}
          onClick={() => setIsShowed(false)}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.user}>
          <img className={styles.userImg} src={user.avatar || userImg} />
          <div>
            <h6>{user.name} {user.surname}</h6>
            <div className={styles.userRating}>
              <span>{user.rating}</span>
              <StarIcon className={styles.userRatingIcon} />
            </div>
          </div>
        </div>
        <div className={styles.links}>
          {user.role === "intern" && (
            <Link className={styles.linksLink} href="/candidate/vacancies">
              <DocumentIcon className={styles.linksLinkIcon} />
              <p>Вакансии</p>
            </Link>
          )}
          <Link className={styles.linksLink} href="/candidate/app">
            <OrderIcon className={styles.linksLinkIcon} />
            <p>Заявка на стажировку</p>
          </Link>
          <Link className={styles.linksLink} href="/profile">
            <UserIcon className={styles.linksLinkIcon} />
            <p>Профиль</p>
          </Link>
          <Link className={styles.linksLink} href="/candidate/notifications">
            <BellIcon className={styles.linksLinkIcon} />
            <p>Уведомления</p>
          </Link>
          <Link className={styles.linksLink} href="/candidate/apps">
            <BoxIcon className={styles.linksLinkIcon} />
            <p>История заявок</p>
          </Link>
        </div>
      </div>
      <Button className={styles.footer} type="text">
        Политика обработки персональных данных
      </Button>
    </div>
  )
}
