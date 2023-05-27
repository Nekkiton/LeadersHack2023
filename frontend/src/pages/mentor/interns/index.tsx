import MenuContainer from "components/layout/MenuContainer"
import Interns from "components/main/Interns"
import { Role } from "models/Role"

export default function VacanciesPage() {
  return (
    <MenuContainer role={Role.MENTOR}>
      <Interns link="/mentor/interns" />
    </MenuContainer>
  )
}
