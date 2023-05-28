import axios from "axios"
import { Organization } from "models/Organization"

export const fetchOrganizationList = () =>
  axios
    .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/organizations`)
    .then((res) => res.data as Organization[])
    .catch((e) => console.log(e))
