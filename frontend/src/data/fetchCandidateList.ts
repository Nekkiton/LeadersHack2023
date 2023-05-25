import axios from "axios"

const testData = [
  {
    id: "011",
    name: "Алеся Егорова",
    avatar: null,
    score: 5,
    status: "review",
    age: 22,
    address: "г. Москва",
    education: "МГУ им. Ломоносова, выпуск 2024 г.",
    reviews: {
      count: 24,
      averageRate: 4.7,
    },
  },
  {
    id: "008",
    name: "Марина Высокова",
    avatar: null,
    score: 20,
    status: "rejected",
    age: 22,
    address: "г. Москва",
    education: "МГУ им. Ломоносова, выпуск 2023 г.",
    reviews: {
      count: 10,
      averageRate: 4.5,
    },
  },
]

export interface InternData {
  id: string
  name: string
  avatar: string | null
  status: string
  score: number
  age: number
  address: string
  education: string
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
  items: InternData[]
  page: number
  totalItems: number
}

export const fetchCandidateList = async ({ page }: QueryParams) => {
  return axios.get("https://api.publicapis.org/entries").then(
    (res) =>
      ({
        items: testData,
        page: 5,
        totalItems: 500,
      } as QueryResponse)
  )
}
