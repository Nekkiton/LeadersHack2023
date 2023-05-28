import axios from "axios"
import { CandidateExperience } from "models/CandidateExperience"

export const saveExperienceInfo = async (data: CandidateExperience) => {
  console.log("Experience to update:", data)
  return axios
    .patch("/api/v1/candidates/info/me", data)
    .then((res) => res.data as CandidateExperience)
}
