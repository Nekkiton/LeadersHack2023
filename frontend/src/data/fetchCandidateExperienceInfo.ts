import axios from "axios"
import { CandidateExperience } from "models/CandidateExperience"

export const fetchCandidateExperienceInfo = async () => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/candidates/me/info`)
    .then((res) => res.data as CandidateExperience)
}
