import MenuContainer from "components/layout/MenuContainer"
import Vacancies from "components/main/Vacancies"

export default function VacanciesPage() {
  return (
    <MenuContainer
      items={[
        {
          text: "Вакансии",
          link: "/staff/vacancies",
        },
        { text: "Обучение наставников" },
        { text: "Расписание стажеров" },
      ]}
    >
      <Vacancies />
    </MenuContainer>
  )
}
