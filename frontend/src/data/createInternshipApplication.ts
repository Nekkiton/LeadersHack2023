import axios from "axios"
import { CandidateExperience } from "models/CandidateExperience"
import { InternshipApplication } from "models/InternshipApplication"
import { UserProfile } from "models/Profile"

interface ApplicationInput {
  userProfile: UserProfile
  candidateProfile: CandidateExperience
}

export const createInternshipApplication = async (data: ApplicationInput) => {
  console.log("Create internship application:", data)
  return axios
    .post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/candidates/me/application`,
      data
    )
    .then((res) => res.data as InternshipApplication)
}
