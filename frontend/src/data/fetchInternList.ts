import axios from "axios"

const testData = [
  {
    id: "017",
    name: "Юлиана Митрофанова",
    avatar: null,
    score: 90,
    status: "internship",
    age: 21,
    address: "г. Москва",
    education: "МГУ им. Ломоносова, выпуск 2025 г.",
    reviews: {
      count: 2,
      averageRate: 4.9,
    },
  },
  {
    id: "009",
    name: "Голубика Ежевиковна",
    avatar: null,
    score: 77,
    status: "looking_internship",
    age: 24,
    address: "г. Москва",
    education: "МГУ им. Ломоносова, выпуск 2024 г.",
    reviews: {
      count: 1,
      averageRate: 3.5,
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

export const fetchInternList = async ({ page }: QueryParams) => {
  return axios.get("https://api.publicapis.org/entries").then(
    (res) =>
      ({
        items: testData,
        page: 5,
        totalItems: 500,
      } as QueryResponse)
  )
}
