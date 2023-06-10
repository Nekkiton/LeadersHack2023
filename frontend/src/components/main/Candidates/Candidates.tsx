import { useState, MouseEvent } from "react"
import Input from "components/base/controls/Input"
import Button from "components/base/controls/Button"
import Select from "components/base/controls/Select"
import Status from "components/base/vacancy/Status"
import Pagination from "components/base/navigation/Pagination"
import UserQuestionIcon from "assets/icons/user-question.svg"
import SearchIcon from "assets/icons/search.svg"
import SortingIcon from "assets/icons/sorting.svg"
import styles from "./Candidates.module.scss"
import { useQuery } from "@tanstack/react-query"
import { fetchCandidateList } from "data"
import { Spin } from "antd"
import CandidateCard from "./CandidateCard"

export default function Candidates() {
  const updateSorting = (
    e: MouseEvent<HTMLButtonElement>,
    setSorting: (val: string) => void
  ) => {
    const pos = e.clientY - e.currentTarget.getBoundingClientRect().top
    const height = e.currentTarget.clientHeight

    if (pos > height / 2) {
      setSorting("desc")
    } else {
      setSorting("asc")
    }
  }

  const [query, setQuery] = useState("")
  const [statuses, setStatuses] = useState([])
  const [nameSorting, setNameSorting] = useState("")
  const [scoreSorting, setScoreSorting] = useState("")
  const [currentPage, setCurrentPage] = useState(0)

  // TODO: add sorting
  const { data, isLoading } = useQuery({
    queryKey: ["candidateList", { query, page: currentPage }],
    queryFn: () =>
      fetchCandidateList({
        search: query,
        page: currentPage,
      }),
  })

  if (isLoading) return <Spin />

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Кандидаты</h1>
      </div>
      {!data?.items ? (
        <div className={styles.nothing}>
          <UserQuestionIcon className={styles.nothingIcon} />
          <p>
            На стажировку еще не зарегистрировался
            <br />
            ни один кандидат
          </p>
        </div>
      ) : (
        <>
          <div className={styles.filters}>
            <Input
              className={styles.searchInput}
              placeholder="Поиск по кандидатам"
              prefix={<SearchIcon />}
              value={query}
              onChange={setQuery}
            />
            <Select
              className={styles.filtersSelect}
              placeholder="Все статусы"
              value={statuses}
              onChange={setStatuses}
              items={[
                {
                  key: "studying",
                  value: <Status status="studying" />,
                },
                {
                  key: "moderating",
                  value: <Status status="moderating" />,
                },
                {
                  key: "finishedTesting",
                  value: <Status status="finishedTesting" />,
                },
                {
                  key: "case",
                  value: <Status status="case" />,
                },
                {
                  key: "internship",
                  value: <Status status="internship" />,
                },
                {
                  key: "rejected",
                  value: <Status status="rejected" />,
                },
              ]}
              multiple
            />
          </div>
          <div className={styles.sorting}>
            <p>Сортировать по</p>
            <Button
              type="text"
              onClick={(e) => updateSorting(e, setNameSorting)}
            >
              <span>ФИО</span>
              <SortingIcon
                className={`${styles.sortingIcon} ${styles[nameSorting]}`}
              />
            </Button>
            <Button
              type="text"
              onClick={(e) => updateSorting(e, setScoreSorting)}
            >
              <span>количеству баллов</span>
              <SortingIcon
                className={`${styles.sortingIcon} ${styles[scoreSorting]}`}
              />
            </Button>
          </div>
          <div className={styles.candidates}>
            {data?.items.map((candidate) => (
              <CandidateCard
                key={candidate.user.id}
                link={`/curator/candidates`}
                candidateInfo={candidate}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={data.totalItems}
          />
        </>
      )}
    </div>
  )
}
