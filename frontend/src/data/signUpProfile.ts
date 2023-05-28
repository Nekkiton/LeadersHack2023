import axios from "axios"

interface QueryData {
  name: string
  surname: string
  patronymic: string
  birthday: string
  citizenship: string
  location: string
  phone: string
  photo: string
  referralId: string
}

export const signUpProfile = async (data: QueryData) => {
  return axios.post("/api/v1/auth/sign-up/profile", data).then((res) => {
    return res.data
  })
}
