import MenuContainer from "components/layout/MenuContainer"
import StaffMain from "components/main/StaffMain"
import { Role } from "models/Role"

export default function VacanciesPage() {
  return (
    <MenuContainer role={Role.STAFF}>
      <StaffMain />
    </MenuContainer>
  )
}
