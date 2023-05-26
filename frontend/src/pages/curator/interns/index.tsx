import Interns from "components/main/Interns"
import MenuContainer from "components/layout/MenuContainer"

export default function InternsPage() {
  return (
    <MenuContainer role="curator">
      <Interns link="/curator/interns" />
    </MenuContainer>
  )
}
