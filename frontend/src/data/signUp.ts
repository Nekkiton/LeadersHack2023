import axios from "axios"

interface QueryData {
  email: string
  password: string
}

export const signUp = async ({ email, password }: QueryData) => {
  return axios
    .post("/api/v1/auth/sign-up", {
      email,
      password,
    })
    .then((res) => {
      return res.data as {
        email: string
      }
    })
}
