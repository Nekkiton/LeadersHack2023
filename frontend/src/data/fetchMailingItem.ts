import axios from "axios"

const testData = [
  {
    id: "5",
    type: ["email", "push"],
    title: "Тестирование кандидатов пройдет с 10 по 17 мая",
    date: "2023-05-06T14:00:00Z",
    body: "Для современного мира высокое качество позиционных исследований прекрасно подходит для реализации поставленных обществом задач. Безусловно, существующая теория способствует повышению качества экспериментов, поражающих по своей масштабности и грандиозности. Господа.",
    recepient_roles: ["candidate", "mentor"],
  },
  {
    id: "7",
    type: ["email", "push"],
    title: "Тестирование кандидатов пройдет с 20 по 27 мая",
    date: "2023-05-06T14:00:00Z",
    body: "ХеХеХе, я злобная вафелька и тебе никогда не пройти тестирование которая я тебе уготовил, хе-хе-хе",
    recepient_roles: ["intern", "mentor"],
  },
]

interface QueryParams {
  id: string
}

interface QueryResponse {
  id: string
  type: string[]
  title: string
  date: string
  body: string
  recepient_roles: string[]
}

export const fetchMailingItem = async ({ id }: QueryParams) => {
  return axios
    .get("https://api.publicapis.org/entries")
    .then((res) => testData.filter((d) => d.id === id)[0] as QueryResponse)
}
