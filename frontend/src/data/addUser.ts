import axios from "axios"
import { Role } from "models/Role"

interface Data {
  role: Role
  email: string
}

export const addUser = (data: Data) =>
  axios
    .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/users`, data)
    .then((res) => res.data as Data)
