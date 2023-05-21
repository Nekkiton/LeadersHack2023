import MenuContainer from "components/layout/MenuContainer"
import DocumentIcon from "assets/icons/document.svg"
import StudentIcon from "assets/icons/student.svg"
import CalendarIcon from "assets/icons/calendar.svg"
import Vacancies from "components/main/Vacancies"

export default function VacanciesPage() {
  return (
    <MenuContainer
      items={[
        {
          text: "Вакансии",
          link: "/mentor/vacancies",
          icon: <DocumentIcon />,
        },
        { text: "Стажеры", link: "/mentor/interns", icon: <StudentIcon /> },
        { text: "Расписание стажеров", icon: <CalendarIcon /> },
      ]}
    >
      <Vacancies />
    </MenuContainer>
  )
}
