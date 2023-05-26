import Mailing from "components/main/Mailing"
import MenuContainer from "components/layout/MenuContainer"

export default function InternsPage() {
  return (
    <MenuContainer role="curator">
      <Mailing link="/curator/mailing" />
    </MenuContainer>
  )
}
