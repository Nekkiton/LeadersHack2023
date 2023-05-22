import MenuContainer from "components/layout/MenuContainer"
import UserQuestionIcon from "assets/icons/user-question.svg"
import StudentIcon from "assets/icons/student.svg"
import DocumentIcon from "assets/icons/document.svg"
import CalendarIcon from "assets/icons/calendar.svg"
import BuildingIcon from "assets/icons/building.svg"
import UploadIcon from "assets/icons/upload.svg"

export default function InternsPage() {
  return (
    <MenuContainer
      items={[
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
      ]}
    ></MenuContainer>
  )
}
