import { useState } from "react"
import Link from "next/link"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import Filters from "components/base/MobileFilters"
import VacancyCard from "components/base/vacancy/VacancyCard"
import Pagination from "components/base/navigation/Pagination"
import DocumentSearchIcon from "assets/icons/document-search.svg"
import SearchIcon from "assets/icons/search.svg"
import styles from "./Responses.module.scss"

interface Props {
  link: string
}

export default function Responses({ link }: Props) {
  // TODO: fetch intern responses (fetch vacancies)

  const [query, setQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const data = {
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
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Отклики</h1>
      {/* TODO: show if no data */}
      {false ? (
        <div className={styles.nothing}>
          <DocumentSearchIcon className={styles.nothingIcon} />
          <p>
            Ты еще не откликнулся ни на одну вакансию. Самое время это сделать
          </p>
          <Link href="/intern/vacancies">
            <Button>Перейти к вакансиям</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.filters}>
            <Input
              className={styles.filtersInput}
              placeholder="Поиск"
              prefix={<SearchIcon />}
              value={query}
              onChange={setQuery}
            />
            <Filters
              items={[
                {
                  key: "vacancyStatus",
                  title: "Статус вакансии",
                  values: [],
                  placeholder: "Все статусы",
                },
                {
                  key: "responseStatus",
                  title: "Статус отклика",
                  placeholder: "Все статусы",
                  values: [],
                },
                {
                  key: "direction",
                  title: "Направление стажировки",
                  placeholder: "Все направления",
                  values: [],
                },
              ]}
            />
          </div>
          <div className={styles.list}>
            <VacancyCard link={link} vacancy={data} />
            <VacancyCard link={link} vacancy={data} />
            <VacancyCard link={link} vacancy={data} />
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={4}
          />
        </>
      )}
    </div>
  )
}
