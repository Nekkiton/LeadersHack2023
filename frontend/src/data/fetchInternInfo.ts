import axios from "axios"

const testData = [{
  id: "017",
  user: {
    name: "Юлиана Митрофанова",
    age: 21,
    address: "г. Москва",
    phone: "+7 (666) 666-66-66",
    email: "yulka@gmail.com",
    reviews: {
      count: 2,
      averageRate: 4.9,
    },
  },
  score: 90,
  schedule: "40 часов в неделю",
  experience:
    "ООО «Рога и копыта» с мая 2022 по май 2023. Ведение социальных сетей, придумывание рекламных креативов АНО «Объединение умов» с января по май 2022. Создание контента для пиара мероприятий",
  projectActivity:
    "В своём стремлении улучшить пользовательский опыт мы упускаем, что базовые сценарии поведения пользователей объективно рассмотрены соответствующими инстанциями. Прежде всего, социально-экономическое развитие в значительной степени обусловливает обусловливает важность переосмысления.",
  about:
    "Противоположная точка зрения подразумевает, что сделанные на базе интернет-аналитики выводы рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Банальные, но неопровержимые выводы, а также независимые государства, вне зависимости от их уровня.",
  education: {
    name: "Московский государственный университет им. М.Ломоносова",
    specialty: "Юридический факультет",
    graduationYear: "2025",
  },
  status: "internship",
},
{
  id: "009",
  user: {
    name: "Голубика Ежевиковна",
    age: 24,
    address: "г. Москва",
    phone: "+7 (999) 999-99-99",
    email: "golubicha_egevichka@gmail.com",
    reviews: {
      count: 1,
      averageRate: 3.5,
    },
  },
  score: 77,
  schedule: "20 часов в неделю",
  experience:
    "ООО «Рога и копыта» с мая 2022 по май 2023. Ведение социальных сетей, придумывание рекламных креативов АНО «Объединение умов» с января по май 2022. Создание контента для пиара мероприятий",
  projectActivity:
    "В своём стремлении улучшить пользовательский опыт мы упускаем, что базовые сценарии поведения пользователей объективно рассмотрены соответствующими инстанциями. Прежде всего, социально-экономическое развитие в значительной степени обусловливает обусловливает важность переосмысления.",
  about:
    "Противоположная точка зрения подразумевает, что сделанные на базе интернет-аналитики выводы рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Банальные, но неопровержимые выводы, а также независимые государства, вне зависимости от их уровня.",
  education: {
    name: "Московский государственный университет им. М.Ломоносова",
    specialty: "Юридический факультет",
    graduationYear: "2024",
  },
  status: "looking_internship",
 }]

interface QueryParams {
  id: string
}

interface QueryResponse {
  id: string
  user: {
    name: string
    avatar: string | null
    age: number
    address: string
    phone: string
    email: string
    reviews: {
      count: number
      averageRate: number
    }
  }

  score: number

  schedule: string

  experience: string
  projectActivity: string
  about: string
  education: {
    name: string
    specialty: string
    graduationYear: string
  }
  status: string
  rejectionReason: string
  testTask: {
    fileName: string
    fileSize: string
  }
  coveringLetter: string
}

export const fetchInternInfo = async ({ id }: QueryParams) => {
  return axios
    .get("https://api.publicapis.org/entries")
    .then((res) => testData.filter(d => d.id === id)[0] as QueryResponse)
}
