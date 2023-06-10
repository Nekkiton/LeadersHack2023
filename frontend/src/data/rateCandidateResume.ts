import axios from "axios"

interface InputRate {
  id: string
  experience: number
  projectActivity: number
  about: number
}

export const rateCandidateResume = async (data: InputRate) => {
  const { id, ...restData } = data
  return axios
    .patch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/candidates/${id}/application/rate`,
      restData
    )
    .then((res) => res.data)
}
