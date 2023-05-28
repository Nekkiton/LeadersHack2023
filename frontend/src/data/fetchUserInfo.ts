import axios from "axios"
import { ProfileShort } from "models/Profile"

export const fetchUserInfo = async () => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/profile-short`)
    .then((res) => res.data as ProfileShort)
}
