import axios from "axios"

interface QueryData {
  email: string
  password: string
}

export const signUp = async ({ email, password }: QueryData) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/sign-up`, {
      email,
      password,
    })
    .then((res) => {
      return res.data as {
        email: string
      }
    })
}
