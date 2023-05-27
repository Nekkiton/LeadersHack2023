import Mailing from "components/main/Mailing"
import MenuContainer from "components/layout/MenuContainer"
import { Role } from "models/Role"

export default function InternsPage() {
  return (
    <MenuContainer role={Role.CURATOR}>
      <Mailing link="/curator/mailing" />
    </MenuContainer>
  )
}
