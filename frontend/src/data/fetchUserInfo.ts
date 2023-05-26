import axios from "axios"

const testData = {
  id: "666",
  name: "Маргарита",
  surname: "Веселова",
  notificationsCount: 1,
  role: "intern",
  rating: "4,8",
}

interface QueryResponse {
  id: string
  avatar: string | null
  name: string
  surname: string
  notificationsCount: number
  role: string
  rating: string
}

export const fetchUserInfo = async () => {
  return axios
    .get("https://api.publicapis.org/entries")
    .then((res) => testData as QueryResponse)
}
