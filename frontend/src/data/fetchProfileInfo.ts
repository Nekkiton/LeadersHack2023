import axios from "axios"
import Profile from "models/Profile"

export const fetchProfileInfo = async () => {
  return axios
    .get("/api/v1/users/profile")
    .then((res) => res.data as Profile);
}
