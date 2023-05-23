import { useRouter } from "next/router"
import Intern from "components/main/Intern"

export default function VacancyResponsePage() {
  const { query } = useRouter()

  return (
    <Intern
      backLink={`/mentor/vacancies/${query.id}`}
      responseId={String(query.responseId)}
    />
  )
}
