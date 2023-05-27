import MenuContainer from "components/layout/MenuContainer"
import MentorMain from "components/main/MentorMain"
import { Role } from "models/Role"

export default function MentorsPage() {
  return (
    <MenuContainer role={Role.MENTOR}>
      <MentorMain />
    </MenuContainer>
  )
}
