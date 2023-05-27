import MenuContainer from "components/layout/MenuContainer"
import Vacancies from "components/main/Vacancies"
import { Role } from "models/Role"

export default function VacanciesPage() {
  return (
    <MenuContainer role={Role.MENTOR}>
      <Vacancies link="/mentor/vacancies" />
    </MenuContainer>
  )
}
