import { useRouter } from "next/router"
import NewVacancy from "components/main/NewVacancy"

export default function EditVacancyPage() {
  const router = useRouter()
  return <NewVacancy editId={router.query.id as string} />
}
