import { useRouter } from "next/router"
import VacancyResponse from "components/main/VacancyResponse"

export default function VacancyResponsePage() {
  const router = useRouter()
  return <VacancyResponse backLink={`/curator/vacancies/${router.query.id}`} />
}
