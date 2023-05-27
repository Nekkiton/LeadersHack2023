import { useRouter } from "next/router"
import NewStaff from "components/main/NewStaff"

export default function NewStaffPage() {
  const router = useRouter()

  let backLink = "/curator"
  if (router.query.organization) {
    backLink = `/curator/organizations/${router.query.organization}`
  }

  return <NewStaff link={backLink} />
}
