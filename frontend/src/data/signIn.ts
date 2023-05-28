import axios from "axios"
import { Role } from "models/Role"

interface QueryData {
  email: string
  password: string
}

export const signIn = async ({ email, password }: QueryData) => {
  return axios
    .post("/api/v1/auth/sign-in", {
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
