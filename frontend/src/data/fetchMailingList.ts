import axios from "axios"

const testData = [
  {
    id: "5",
    type: ["email", "push"],
    title: "Тестирование кандидатов пройдет с 10 по 17 мая",
    date: "2023-05-06T14:00:00Z",
    recepient_roles: ["candidate", "mentor"],
  },
  {
    id: "7",
    type: ["email", "push"],
    title: "Тестирование кандидатов пройдет с 20 по 27 мая",
    date: "2023-05-06T14:00:00Z",
    recepient_roles: ["intern", "mentor"],
  },
]

interface MailingItem {
  id: string
  type: string[]
  title: string
  date: string
  recepient_roles: string[]
}
interface QueryParams {
  page: number
  search: string
}

interface QueryResponse {
  items: MailingItem[]
  page: number
  totalItems: number
}

export const fetchMailingList = async ({ page }: QueryParams) => {
  return axios.get("https://api.publicapis.org/entries").then(
    (res) =>
      ({
        items: testData,
        page: 5,
        totalItems: 500,
      } as QueryResponse)
  )
}
