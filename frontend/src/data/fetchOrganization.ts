import axios from "axios"
import { Organization } from "models/Organization"

interface Data {
  id: string
}

export const fetchOrganization = ({ id }: Data) =>
  axios
    .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/organizations/${id}`)
    .then((res) => res.data as Organization)
    .catch((e) => console.log(e))
