import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import Button from "components/base/controls/Button"
import Select from "components/base/controls/Select"
import Input from "components/base/controls/Input"
import Pagination from "components/base/navigation/Pagination"
import VacancyStatus from "components/base/vacancy/Status"
import styles from "./Vacancies.module.scss"
import PlusIcon from "assets/icons/plus.svg"
import SearchIcon from "assets/icons/search.svg"
import NothingIcon from "assets/icons/document-search.svg"
import TimesIcon from "assets/icons/times.svg"
import VacancyCard from "components/base/vacancy/VacancyCard"
import { fetchVacancyList } from "data/fetchVacancyList"

const userImg = "/images/user.svg"

export default function Vacancies() {
  const [query, setQuery] = useState("")
  const [statuses, setStatuses] = useState([])
  const [mentors, setMentors] = useState([])
  const [currentPage, setCurrentPage] = useState(5)

  const { data, isLoading } = useQuery({
    queryKey: ["vacancyList", { query, statuses, mentors, page: currentPage }],
    queryFn: () =>
      fetchVacancyList({
        search: query,
        statuses,
        mentors,
        page: currentPage,
      }),
  })

  const clearFilters = () => {
    setQuery("")
    setStatuses([])
    setMentors([])
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Вакансии</h1>
        {true && (
          <Link href="/staff/add-vacancy">
            <Button>
              <PlusIcon className="icon" />
              <span>Создать вакансию</span>
            </Button>
          </Link>
        )}
      </div>
      {false ? (
        <div className={styles.nothing}>
          <NothingIcon className={styles.nothingIcon} />
          <p className={styles.nothingText}>
            Вы еще не создали ни одной вакансии.
            <br />
            Самое время это исправить
          </p>
          <Link href="/staff/add-vacancy">
            <Button>
              <PlusIcon className="icon" />
              <span>Создать вакансию</span>
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.filters}>
            <div className={styles.filtersFields}>
              <Input
                className={styles.filtersInput}
                prefix={<SearchIcon />}
                placeholder="Поиск по вакансиям"
                value={query}
                onChange={setQuery}
              />
              <Select
                className={styles.filtersSelect}
                placeholder="Все статусы"
                items={{
                  active: <VacancyStatus status="active" />,
                  archived: <VacancyStatus status="archived" />,
                }}
                value={statuses}
                onChange={setStatuses}
                multiple
              />
              <Select
                className={styles.filtersSelect}
                placeholder="Все наставники"
                items={{
                  1: (
                    <div className={styles.filtersMentor}>
                      <img className={styles.filtersMentorImg} src={userImg} />
                      <p className={styles.filtersMentorName}>
                        Юлиана Митрофанова
                      </p>
                    </div>
                  ),
                }}
                value={mentors}
                onChange={setMentors}
                multiple
              />
            </div>
            {(query || !!statuses.length || !!mentors.length) && (
              <Button
                className={styles.filtersClear}
                type="text"
                onClick={clearFilters}
              >
                <TimesIcon className="icon" />
                <span>Сбросить все</span>
              </Button>
            )}
          </div>
          {isLoading ? (
            <p>Загрузка...</p>
          ) : (
            <div className={styles.vacancies}>
              {data?.items.map((vacancy) => (
                <VacancyCard vacancy={vacancy} />
              ))}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={data?.totalPages ?? 0}
          />
        </>
      )}
    </div>
  )
}
