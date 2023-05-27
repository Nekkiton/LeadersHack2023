import Link from "next/link"
import Button from "components/base/controls/Button"
import TimesIcon from "assets/icons/times.svg"
import StarIcon from "assets/icons/star.svg"
import DocumentIcon from "assets/icons/document.svg"
import UserIcon from "assets/icons/user.svg"
import OrderIcon from "assets/icons/order.svg"
import LogoutIcon from "assets/icons/logout.svg"
import MentorIcon from "assets/icons/mentor.svg"
import CommentIcon from "assets/icons/comment.svg"
import UserQuestionIcon from "assets/icons/user-question.svg"
import StudentIcon from "assets/icons/student.svg"
import BuildingIcon from "assets/icons/building.svg"
import UploadIcon from "assets/icons/upload.svg"
import BellIcon from "assets/icons/bell.svg"
import styles from "./MobileMenu.module.scss"

interface Props {
  isShowed: boolean
  setIsShowed: (val: boolean) => void
  user: any // user model here
}

const userImg = "/images/user.svg"
const logoImg = "/images/logo.svg"

export default function MobileMenu({ isShowed, setIsShowed, user }: Props) {
  const links = {
    staff: [
      {
        text: "Вакансии",
        link: "/staff/vacancies",
        icon: <DocumentIcon />,
      },
      { text: "Наставники", link: "/staff/mentors", icon: <MentorIcon /> },
    ],
    mentor: [
      {
        text: "Вакансии",
        link: "/mentor/vacancies",
        icon: <DocumentIcon />,
      },
      { text: "Стажеры", link: "/mentor/interns", icon: <StudentIcon /> },
    ],
    // TODO: add internship to curator and manage active internship
    curator: [
      {
        link: "/curator/candidates",
        text: "Кандидаты",
        icon: <UserQuestionIcon />,
      },
      { link: "/curator/interns", text: "Стажеры", icon: <StudentIcon /> },
      {
        link: "/curator/organizations",
        text: "Организации",
        icon: <BuildingIcon />,
      },
      {
        link: "/curator/vacancies",
        text: "Вакансии",
        icon: <DocumentIcon />,
      },
      { link: "/curator/mailing", text: "Рассылки", icon: <UploadIcon /> },
    ],
    candidate: [
      {
        // TODO: fetch active internship
        text: "Заявка на стажировку 2023 — 2024",
        link: "/intern/register",
        icon: <OrderIcon />,
      },
      { text: "Профиль", link: "/profile", icon: <UserIcon /> },
    ],
    intern: [
      { text: "Вакансии", link: "/intern/vacancies", icon: <DocumentIcon /> },
      { text: "Отклики", link: "/intern/responses", icon: <CommentIcon /> },
      {
        // TODO: fetch active internship
        text: "Заявка на стажировку 2023 — 2024",
        link: "/intern/app",
        icon: <OrderIcon />,
      },
      { text: "Профиль", link: "/profile", icon: <UserIcon /> },
    ],
  }

  const logout = () => {
    setIsShowed(false)
  }

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
        <Link
          className={styles.user}
          href="/profile"
          onClick={() => setIsShowed(false)}
        >
          <img className={styles.userImg} src={user.avatar || userImg} />
          <div>
            <h6>
              {user.name} {user.surname}
            </h6>
            <div className={styles.userRating}>
              <span>{user.rating}</span>
              <StarIcon className={styles.userRatingIcon} />
            </div>
          </div>
        </Link>
        <div className={styles.links}>
          {(links[user.role as keyof typeof links] || []).map((item) => (
            <Link
              className={styles.linksLink}
              href={item.link}
              onClick={() => setIsShowed(false)}
            >
              {item.icon}
              <p>{item.text}</p>
            </Link>
          ))}
          <Link
            className={styles.linksLink}
            href="/notifications"
            onClick={() => setIsShowed(false)}
          >
            {/* TODO: marked if there are new notifications */}
            <span className={`${styles.notificationIcon} ${styles.marked}`}>
              <BellIcon />
            </span>
            <p>Уведомления</p>
          </Link>
        </div>
      </div>
      <div className={styles.footer}>
        <Button type="secondary" onClick={logout}>
          <span>Выйти</span>
          <LogoutIcon className="icon" />
        </Button>
        <span>
          <Button type="text">Политика обработки персональных данных</Button>
        </span>
      </div>
    </div>
  )
}
