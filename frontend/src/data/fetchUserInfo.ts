import axios from "axios"
import { ProfileShort } from "models/Profile"

export const fetchUserInfo = async () => {
  return axios
    .get("/api/v1/users/profile-short")
    .then((res) => res.data as ProfileShort);
}
