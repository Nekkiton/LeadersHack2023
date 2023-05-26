import axios from "axios"

const testData = [
  {
    id: "1902",
    date: "20 иолюя 2023",
    title: "UX/UI дизайнер",
    company: {
      id: "1",
      name: "Карьерный центр Правительства Москвы",
    },
    status: "active",
    mentor: {
      id: "007",
      name: "Юлиана Митрофанова",
      avatar: null,
    },
    responses: {
      count: 19,
      countNew: 5,
    },
  },
  {
    id: "1907",
    date: "15 иолюя 2023",
    title: "Fullstack-разработчик",
    company: {
      id: "1",
      name: "Карьерный центр Правительства Москвы",
    },
    status: "active",
    mentor: {
      id: "008",
      name: "Марина Высокова",
      avatar: null,
    },
    responses: {
      count: 11,
      countNew: 2,
    },
  },
]

export interface VacancyData {
  id: string
  date: string
  title: string
  company: {
    id: string
    name: string
  }
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
  totalItems: number
}

export const fetchVacancyList = async ({ page }: QueryParams) => {
  return axios.get("https://api.publicapis.org/entries").then(
    (res) =>
      ({
        items: testData,
        page: 5,
        totalItems: 500,
      } as QueryResponse)
  )
}
