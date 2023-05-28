import axios from "axios"
import { CandidateExperience } from "models/CandidateExperience"

export const fetchCandidateExperienceInfo = async () => {
  return axios
    .get("/api/v1/candidates/info/me")
    .then((res) => res.data as CandidateExperience)
}
