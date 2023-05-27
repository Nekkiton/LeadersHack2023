import MenuContainer from "components/layout/MenuContainer"
import Candidates from "components/main/Candidates"
import { Role } from "models/Role"

export default function CandidatesPage() {
  return (
    <MenuContainer role={Role.CURATOR}>
      <Candidates />
    </MenuContainer>
  )
}
