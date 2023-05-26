import { useRouter } from "next/router"
import NewMailing from "components/main/NewMailing"

export default function EditMailingPage() {
  const router = useRouter()

  return <NewMailing editId={router.query.id as string} />
}
