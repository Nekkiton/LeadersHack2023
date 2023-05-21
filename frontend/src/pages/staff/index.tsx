import MenuContainer from "components/layout/MenuContainer"
import DocumentIcon from "assets/icons/document.svg"
import MentorIcon from "assets/icons/mentor.svg"
import CalendarIcon from "assets/icons/calendar.svg"
import StaffMain from "components/main/StaffMain"

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
      <StaffMain />
    </MenuContainer>
  )
}