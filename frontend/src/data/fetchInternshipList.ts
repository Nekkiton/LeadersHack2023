import axios from "axios"
import { Internship } from "models/Internship"

export const fetchInternshipList = () =>
  axios
    .get("/api/v1/internships")
    .then((res) => res.data as Internship[])
    .catch((e) => console.log(e))
