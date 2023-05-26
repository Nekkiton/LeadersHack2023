import MenuContainer from "components/layout/MenuContainer"
import Vacancies from "components/main/Vacancies"

export default function VacanciesPage() {
  return (
    <MenuContainer role="curator">
      <Vacancies link="/curator/vacancies" />
    </MenuContainer>
  )
}
