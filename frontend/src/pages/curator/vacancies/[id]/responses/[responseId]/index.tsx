import { useRouter } from "next/router"
import VacancyResponse from "components/main/VacancyResponse"

export default function VacancyResponsePage() {
  const { query } = useRouter()
  return (
    <VacancyResponse
      backLink={`/curator/vacancies/${query.id}`}
      responseId={String(query.responseId)}
    />
  )
}
