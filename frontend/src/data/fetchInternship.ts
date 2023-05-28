import axios from "axios"
import { Internship } from "models/Internship"

interface Data {
  id: string
}

export const fetchInternship = async ({ id }: Data) => {
  return axios
    .get(`/api/v1/internships/${id}`)
    .then((res) => res.data as Internship[])
}
