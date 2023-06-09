import axios from "axios"

const testData = [
  {
    id: "007",
    name: "Юлиана Митрофанова",
    avatar: null,
    phone: "+7(921)123-45-67",
    email: "marina@gmail.com",
    status: "pass_education",
    progress: null,
    reviews: {
      count: 1,
      averageRate: 4.4,
    },
  },
  {
    id: "008",
    name: "Марина Высокова",
    avatar: null,
    phone: "+7 (910) 234-56-78",
    email: "marina@gmail.com",
    status: "education",
    progress: 75,
    reviews: {
      count: 10,
      averageRate: 4.7,
    },
  },
]

export interface MentorData {
  id: string
  name: string
  avatar: string | null
  phone: string
  email: string
  status: string
  progress: number
  reviews: {
    count: number
    averageRate: number
  }
}

interface QueryParams {
  page: number
  search: string
}

interface QueryResponse {
  items: MentorData[]
  page: number
  totalItems: number
}

export const fetchMentorList = async ({ page }: QueryParams) => {
  return axios.get("https://api.publicapis.org/entries").then(
    (res) =>
      ({
        items: testData,
        page: 5,
        totalItems: 500,
      } as QueryResponse)
  )
}
