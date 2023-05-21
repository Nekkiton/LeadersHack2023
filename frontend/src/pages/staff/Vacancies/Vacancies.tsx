import MenuContainer from "components/layout/MenuContainer"
import Vacancies from "components/main/Vacancies"
import { ReactComponent as DocumentIcon } from "assets/icons/document.svg"
import { ReactComponent as MentorIcon } from "assets/icons/mentor.svg"
import { ReactComponent as CalendarIcon } from "assets/icons/calendar.svg"

export default function VacanciesPage() {
  return (
    <MenuContainer
      items={[
        {
          text: "Вакансии",
          link: "/staff/vacancies",
          icon: <DocumentIcon />,
        },
        { text: "Наставники", link: "/staff/mentors", icon: <MentorIcon /> },
        { text: "Расписание стажеров", icon: <CalendarIcon /> },
      ]}
    >
      <Vacancies />
    </MenuContainer>
  )
}
