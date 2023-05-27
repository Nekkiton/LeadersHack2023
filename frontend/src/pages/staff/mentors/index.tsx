import MenuContainer from "components/layout/MenuContainer"
import Mentors from "components/main/Mentors"
import { Role } from "models/Role"

export default function VacanciesPage() {
  return (
    <MenuContainer role={Role.STAFF}>
      <Mentors />
    </MenuContainer>
  )
}
