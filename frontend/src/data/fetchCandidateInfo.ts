import axios from "axios"
import { CandidateStatus } from "./types"
import { Candidate } from "models/Candidate"

const testData = [
  {
    id: "011",
    user: {
      name: "Алеся Егорова",
      age: 22,
      avatar: null,
      address: "г. Москва",
      phone: "+7 (910) 234-56-78",
      email: "alesa@gmail.com",
      reviews: {
        count: 24,
        averageRate: 4.7,
      },
    },

    score: 5,
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
    previousStatus: CandidateStatus.moderation,
    status: CandidateStatus.passed,
    rejectionReason: "",
    testTask: {
      fileName: "Document_name... .pdf",
      fileSize: "2 MB",
    },
  },
  {
    id: "008",
    user: {
      name: "Марина Высокова",
      age: 22,
      avatar: null,
      address: "г. Москва",
      phone: "+7 (911) 112-56-78",
      email: "marina@gmail.com",
      reviews: {
        count: 10,
        averageRate: 4.5,
      },
    },

    score: 20,
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
      graduationYear: "2023",
    },
    previousStatus: CandidateStatus.tested,
    status: CandidateStatus.rejected,
    rejectionReason:
      "Спасибо за ваш отклик. К сожалению, пока что мы не готовы взять вас на стажировку.",
    testTask: {
      fileName: "Document_name... .pdf",
      fileSize: "2 MB",
    },
  },
]

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
  previousStatus: CandidateStatus
  status: CandidateStatus
  rejectionReason: string
  testTask: {
    fileName: string
    fileSize: string
  }
  coveringLetter: string
}

export const fetchCandidateInfo = async ({ id }: QueryParams) => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/candidate/${id}`)
    .then((res) => res.data as Candidate)
}
