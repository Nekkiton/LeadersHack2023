import MenuContainer from "components/layout/MenuContainer"
import Profile from "components/main/Profile"
import { Role } from "models/Role"

export default function VacanciesPage() {
  return (
    <MenuContainer role={Role.INTERN}>
      <Profile />
    </MenuContainer>
  )
}
