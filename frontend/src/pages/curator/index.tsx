import CuratorMain from "components/main/CuratorMain"
import MenuContainer from "components/layout/MenuContainer"
import { Role } from "models/Role"

export default function InternsPage() {
  return (
    <MenuContainer role={Role.CURATOR}>
      <CuratorMain />
    </MenuContainer>
  )
}
