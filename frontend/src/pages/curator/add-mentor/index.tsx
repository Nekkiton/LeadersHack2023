import { useRouter } from "next/router"
import NewMentor from "components/main/NewMentor"

export default function NewMentorPage() {
  const router = useRouter()

  let backLink = "/curator"

  if (router.query.organization) {
    backLink = `/curator/organizations/${router.query.organization}`
  }

  return <NewMentor link={backLink} />
}
