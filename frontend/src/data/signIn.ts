import axios from "axios"
import { Role } from "models/Role"

interface QueryData {
  email: string
  password: string
}

export const signIn = async ({ email, password }: QueryData) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/sign-in`, {
      email,
      password,
    })
    .then((res) => {
      return res.data as {
        email: string
        role: Role
      }
    })
}
