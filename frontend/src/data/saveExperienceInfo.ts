import axios from "axios"
import { CandidateExperience } from "models/CandidateExperience"

export const saveExperienceInfo = async (data: CandidateExperience) => {
  console.log("Experience to update:", data)
  return axios
    .patch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/candidates/me/info`, data)
    .then((res) => res.data as CandidateExperience)
}
