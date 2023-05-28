import axios from "axios"
import { Internship } from "models/Internship"

// updates current internship
export const updateInternship = (data: Internship) =>
  axios
    .patch("/api/v1/internships/current", data)
    .then((res) => res.data as Internship)
