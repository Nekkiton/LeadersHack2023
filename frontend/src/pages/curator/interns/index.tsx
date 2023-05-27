import Interns from "components/main/Interns"
import MenuContainer from "components/layout/MenuContainer"
import { Role } from "models/Role"

export default function InternsPage() {
  return (
    <MenuContainer role={Role.CURATOR}>
      <Interns link="/curator/interns" />
    </MenuContainer>
  )
}
