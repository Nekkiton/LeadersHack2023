import { Role } from "./Role"

export default interface Profile {
  name: string
  surname: string
  patronymic: string
  birthday: string
  citizenship: string
  location: string
  phone: string
  photo: string
  email: string
  role: Role
}

export interface ProfileShort {
  name: string
  surname: string
  photo: string
  role: Role
  rating: number
}

export interface UserProfile {
  name: string
  surname: string
  patronymic: string
  birthday: string
  citizenship: string
  location: string
  phone: string
  photo: string
}
