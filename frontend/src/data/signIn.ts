import axios from "axios"

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
      return res.data
    })
    .catch((err) => console.log(err))
}
