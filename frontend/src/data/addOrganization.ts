import axios from "axios"
import { Organization } from "models/Organization"

export const addOrganization = (data: Organization) =>
  axios
    .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/organizations`, data)
    .then((res) => res.data as Organization)
