import { useRouter } from "next/router"
import Organization from "components/main/Organization"

export default function InternsPage() {
  const router = useRouter()

  return (
    <Organization
      backLink="/curator/organizations"
      id={router.query.id as string}
    />
  )
}
