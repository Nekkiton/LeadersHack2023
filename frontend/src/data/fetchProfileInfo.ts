import axios from "axios"
import Profile from "models/Profile"

export const fetchProfileInfo = async () => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/profile`)
    .then((res) => res.data as Profile)
}
