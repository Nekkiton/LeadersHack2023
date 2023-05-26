import MenuContainer from "components/layout/MenuContainer"
import Vacancies from "components/main/Vacancies"

export default function VacanciesPage() {
  return (
    <MenuContainer role="intern">
      <Vacancies link="/intern/vacancies" />
    </MenuContainer>
  )
}
