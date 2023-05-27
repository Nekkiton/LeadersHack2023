import MenuContainer from "components/layout/MenuContainer"
import Responses from "components/main/Responses"
import { Role } from "models/Role"

export default function ResponsesPage() {
  return (
    <MenuContainer role={Role.INTERN}>
      <Responses link="/intern/vacancies" />
    </MenuContainer>
  )
}
