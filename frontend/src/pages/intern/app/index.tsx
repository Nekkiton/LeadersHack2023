import MenuContainer from "components/layout/MenuContainer"
import InternshipApp from "components/main/InternshipApp"
import { Role } from "models/Role"

export default function InternshipAppPage() {
  return (
    <MenuContainer role={Role.INTERN}>
      <InternshipApp />
    </MenuContainer>
  )
}
