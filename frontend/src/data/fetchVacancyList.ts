import axios from "axios"

const testData = [
  {
    id: "1902",
    date: "20 иолюя 2023",
    title: "UX/UI дизайнер",
    company: "Карьерный центр Правительства Москвы",
    status: "active",
    mentor: {
      id: "1",
      name: "Юлиана Митрофанова",
      avatar: null,
    },
    responses: {
      count: 19,
      countNew: 5,
    },
  },
]

export interface VacancyData {
  id: string
  date: string
  title: string
  company: string
  status: string
  mentor: {
    id: string
    name: string
    avatar: string | null
  }
  responses: {
    count: number
    countNew: number
  }
}

interface QueryParams {
  page: number
  search: string
  statuses: string[]
  mentors: string[]
}

interface QueryResponse {
  items: VacancyData[]
  page: number
  totalPages: number
}

export const fetchVacancyList = async ({ page }: QueryParams) => {
  return axios.get("https://api.publicapis.org/entries").then(
    (res) =>
      ({
        items: testData,
        page: 5,
        totalPages: 10,
      } as QueryResponse)
  )
}
