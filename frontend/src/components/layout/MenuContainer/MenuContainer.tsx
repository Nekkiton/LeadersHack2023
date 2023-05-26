import { ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Button from "components/base/controls/Button"
import HomeIcon from "assets/icons/home.svg"
import DocumentIcon from "assets/icons/document.svg"
import MentorIcon from "assets/icons/mentor.svg"
import CalendarIcon from "assets/icons/calendar.svg"
import CommentIcon from "assets/icons/comment.svg"
import OrderIcon from "assets/icons/order.svg"
import UserQuestionIcon from "assets/icons/user-question.svg"
import StudentIcon from "assets/icons/student.svg"
import BuildingIcon from "assets/icons/building.svg"
import UploadIcon from "assets/icons/upload.svg"
import styles from "./MenuContainer.module.scss"

interface MenuItem {
  link?: string
  text: string
  icon?: ReactNode
}

interface MenuItemProps {
  item: MenuItem
  children?: ReactNode
}

function MenuItem({ item, children }: MenuItemProps) {
  const router = useRouter()

  const activeClassName = router.pathname === item.link ? styles.active : ""

  if (item.link)
    return (
      <Link className={`${styles.link} ${activeClassName}`} href={item.link}>
        {children}
      </Link>
    )
  return <div className={`${styles.link} ${styles.disabled}`}>{children}</div>
}

interface Props {
  // TODO: determine role without parameters (from user object)
  role: "staff" | "mentor" | "curator" | "candidate" | "intern"
  children?: ReactNode
}

export default function MenuContainer({ children, role }: Props) {
  const links = {
    staff: [
      {
        text: "Главная",
        link: "/staff",
        icon: <HomeIcon />,
      },
      {
        text: "Вакансии",
        link: "/staff/vacancies",
        icon: <DocumentIcon />,
      },
      { text: "Наставники", link: "/staff/mentors", icon: <MentorIcon /> },
      { text: "Расписание стажеров", icon: <CalendarIcon /> },
    ],
    mentor: [
      {
        text: "Главная",
        link: "/mentor",
        icon: <HomeIcon />,
      },
      {
        text: "Вакансии",
        link: "/mentor/vacancies",
        icon: <DocumentIcon />,
      },
      { text: "Стажеры", link: "/mentor/interns", icon: <StudentIcon /> },
      { text: "Расписание стажеров", icon: <CalendarIcon /> },
    ],
    // TODO: add internship to curator and manage active internship
    curator: [
      {
        text: "Главная",
        link: "/curator",
        icon: <HomeIcon />,
      },
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
      { text: "Расписание стажеров", icon: <CalendarIcon /> },
    ],
    // TODO: remove this?
    candidate: [],
    intern: [
      {
        text: "Главная",
        link: "/intern",
        icon: <HomeIcon />,
      },
      { text: "Вакансии", link: "/intern/vacancies", icon: <DocumentIcon /> },
      { text: "Отклики", link: "/intern/responses", icon: <CommentIcon /> },
      {
        // TODO: fetch active internship
        text: "Заявка на стажировку 2023 — 2024",
        link: "/intern/responses/1",
        icon: <OrderIcon />,
      },
      { text: "Расписание стажеров", icon: <CalendarIcon /> },
    ],
  }

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        {links[role].map((item) => (
          <MenuItem item={item} key={item.text + item.link}>
            {item.icon && <span className={styles.linkIcon}>{item.icon}</span>}
            <span>{item.text}</span>
          </MenuItem>
        ))}
      </div>
      <div className={styles.body}>
        {children}
        <Button className={styles.footer} type="text">
          Политика обработки персональных данных
        </Button>
      </div>
    </div>
  )
}
