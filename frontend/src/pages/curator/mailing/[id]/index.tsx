import MailingItem from "components/main/MailingItem"
import { useRouter } from "next/router"

export default function MailingPage() {
  const { query } = useRouter()

  return <MailingItem backLink="/curator/mailing" mailId={String(query.id)}/>
}
