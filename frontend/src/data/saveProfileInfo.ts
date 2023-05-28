import axios from "axios"
import Profile from "models/Profile"

export default interface InputProfile {
  name: string
  surname: string
  patronymic: string
  birthday: string
  citizenship: string
  location: string
  phone: string
  photo: string
}

export const saveProfileInfo = async (data: InputProfile) => {
  console.log("Profile to update:", data)
  return axios
    .patch("/api/v1/users/profile", data)
    .then((res) => res.data as Profile)
}
