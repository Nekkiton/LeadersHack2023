import { useState } from "react"
import Input from "components/base/controls/Input"
import Button from "components/base/controls/Button"
import Select from "components/base/controls/Select"
import Status from "components/base/vacancy/Status"
import ResponseCard from "components/base/vacancy/ResponseCard"
import Pagination from "components/base/navigation/Pagination"
import UserQuestionIcon from "assets/icons/user-question.svg"
import SearchIcon from "assets/icons/search.svg"
import styles from "./Candidates.module.scss"
import { useQuery } from "@tanstack/react-query"
import { fetchCandidateList } from "data"
import { Spin } from "antd"

export default function Candidates() {
  const [query, setQuery] = useState("")
  const [statuses, setStatuses] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

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
          {/* TODO: add sorting */}
          <div className={styles.sorting}>
            <p>Сортировать по</p>
            <Button type="text">ФИО</Button>
            <Button type="text">количеству баллов</Button>
          </div>
          <div className={styles.candidates}>
            {data?.items.map((candidate) => (
              <ResponseCard
                key={candidate.id}
                link={`/curator/candidates`}
                responseInfo={candidate}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={500} // take from data response
          />
        </>
      )}
    </div>
  )
}
