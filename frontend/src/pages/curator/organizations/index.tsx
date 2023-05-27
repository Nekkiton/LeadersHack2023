import Organizations from "components/main/Organizations"
import MenuContainer from "components/layout/MenuContainer"
import { Role } from "models/Role"

export default function InternsPage() {
  return (
    <MenuContainer role={Role.CURATOR}>
      <Organizations link="/curator/organizations" />
    </MenuContainer>
  )
}
