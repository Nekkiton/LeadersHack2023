import Intern from "components/main/Intern"
import { useRouter } from "next/router"

export default function InternPage() {
  const { query } = useRouter()

  return <Intern backLink="/curator/interns" internId={String(query.id)} />
}
