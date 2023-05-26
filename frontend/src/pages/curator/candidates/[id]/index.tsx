import Candidate from "components/main/Candidate"
import { useRouter } from "next/router"

export default function CandidatePage() {
  const { query } = useRouter()

  return <Candidate backLink="/curator/candidates" candidateId={String(query.id)}/>
}
