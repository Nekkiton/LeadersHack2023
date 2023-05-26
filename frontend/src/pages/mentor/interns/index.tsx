import MenuContainer from "components/layout/MenuContainer"
import Interns from "components/main/Interns"

export default function VacanciesPage() {
  return (
    <MenuContainer role="mentor">
      <Interns link="/mentor/interns" />
    </MenuContainer>
  )
}
