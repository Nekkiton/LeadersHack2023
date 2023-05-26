import Organizations from "components/main/Organizations"
import MenuContainer from "components/layout/MenuContainer"

export default function InternsPage() {
  return (
    <MenuContainer role="curator">
      <Organizations link="/curator/organizations" />
    </MenuContainer>
  )
}
