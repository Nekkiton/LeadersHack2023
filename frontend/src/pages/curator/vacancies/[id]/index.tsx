import { useRouter } from "next/router"
import Vacancy from "components/main/Vacancy"

export default function VacancyPage() {
  const router = useRouter()

  let backLink = "/curator/vacancies"

  if (router.query.organization) {
    backLink = `/curator/organizations/${router.query.organization}`
  }

  return <Vacancy backLink={backLink} link="/curator/vacancies" />
}
