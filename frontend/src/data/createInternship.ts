import axios from "axios"
import { Internship } from "models/Internship"

export const createInternship = async (data: Internship) => {
  return axios
    .post(`/api/v1/internships`, data)
    .then((res) => res.data as Internship)
}
