import axios from "axios"
import { Candidate } from "models/Candidate"

interface QueryParams {
  page: number
  search: string
}

interface QueryResponse {
  items: Candidate[]
  page: number
  totalItems: number
}

export const fetchCandidateList = async ({ page }: QueryParams) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/candidates`).then(
    (res) =>
      ({
        items: res.data,
        page: 1,
        totalItems: 10,
      } as QueryResponse)
  )
}
