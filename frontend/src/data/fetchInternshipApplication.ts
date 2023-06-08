import axios from "axios"
import { InternshipApplication } from "models/InternshipApplication"

export const fetchInternshipApplication = async () => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/candidates/me/application`)
    .then((res) => res.data as InternshipApplication)
}
