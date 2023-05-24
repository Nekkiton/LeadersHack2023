import { ReactNode } from "react"
import MobileMenuContainer from "components/layout/MobileMenuContainer"
import HomeIcon from "assets/icons/home.svg"
import EventIcon from "assets/icons/event.svg"

interface Props {
  children?: ReactNode
}

const userImg = "/images/user.svg"

export default function CandidateMobileMenuContainer({ children }: Props) {
  return (
    <MobileMenuContainer
      items={[
        { title: "Главная", link: "/candidate", icon: <HomeIcon /> },
        {
          title: "Стажировки",
          link: "/candidate/internships",
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
