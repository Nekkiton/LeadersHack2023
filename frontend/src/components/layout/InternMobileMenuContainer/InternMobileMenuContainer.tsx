import { ReactNode } from "react"
import MobileMenuContainer from "components/layout/MobileMenuContainer"
import EventIcon from "assets/icons/event.svg"
import DocumentIcon from "assets/icons/document.svg"
import CommentIcon from "assets/icons/comment.svg"
import HomeIcon from "assets/icons/home.svg"

interface Props {
  children?: ReactNode
}

const userImg = "/images/user.svg"

export default function CandidateMobileMenuContainer({ children }: Props) {
  return (
    <MobileMenuContainer
      items={[
        { title: "Главная", link: "/intern", icon: <HomeIcon /> },
        {
          title: "Вакансии",
          link: "/intern/vacancies",
          icon: <DocumentIcon />,
        },
        {
          title: "Отклики",
          link: "/intern/responses",
          icon: <CommentIcon />,
        },
        {
          title: "Стажировки",
          link: "/intern/internships",
          icon: <EventIcon />,
        },
        {
          title: "Профиль",
          link: "/candidate/profile",
          icon: (
            <img
              src={userImg}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          ),
        },
      ]}
    >
      {children}
    </MobileMenuContainer>
  )
}
