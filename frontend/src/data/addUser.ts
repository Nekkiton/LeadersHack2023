import axios from "axios"
import { Role } from "models/Role"

interface Data {
  role: Role
  email: string
}

export const addUser = (data: Data) =>
  axios.post("/api/v1/admin/users", { data }).then((res) => res.data as Data)
