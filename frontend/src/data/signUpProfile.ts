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
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/sign-up/profile`, data)
    .then((res) => {
      return res.data
    })
}
