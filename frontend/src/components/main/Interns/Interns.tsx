import Input from "components/base/controls/Input"
import ResponseCard from "components/base/vacancy/ResponseCard"
import Pagination from "components/base/navigation/Pagination"
import Select from "components/base/controls/Select"
import ResponseStatus from "components/base/vacancy/ResponseStatus"
import StudentIcon from "assets/icons/student.svg"
import SearchIcon from "assets/icons/search.svg"
import styles from "./Interns.module.scss"
import { Spin } from "antd"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { fetchInternList } from "data"

interface Props {
  link: string
}

export default function Interns({ link }: Props) {
  const [query, setQuery] = useState("")
  const [statuses, setStatuses] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  // TODO: filter by status
  const { data, isLoading } = useQuery({
    queryKey: ["internList", { query, page: currentPage }],
    queryFn: () =>
      fetchInternList({
        search: query,
        page: currentPage,
      }),
  })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Стажеры</h1>
      </div>
      {false ? (
        <div className={styles.nothing}>
          <StudentIcon className={styles.nothingIcon} />
          <p>У вас еще нет стажеров на наставничестве</p>
        </div>
      ) : (
        <>
          <div className={styles.filters}>
            <Input
              className={styles.searchInput}
              placeholder="Поиск по стажерам"
              prefix={<SearchIcon />}
              value={query}
              onChange={setQuery}
            />
            <Select
              className={styles.filtersSelect}
              multiple
              placeholder="Все статусы"
              value={statuses}
              onChange={setStatuses}
              items={[
                {
                  key: "internshipAccepted",
                  value: <ResponseStatus status="internshipAccepted" />,
                },
                {
                  key: "internshipActive",
                  value: <ResponseStatus status="internshipActive" />,
                },
                {
                  key: "internshipFinished",
                  value: <ResponseStatus status="internshipFinished" />,
                },
                { key: "new", value: <ResponseStatus status="new" /> },
              ]}
            />
          </div>
          {isLoading ? (
            <Spin />
          ) : (
            <>
              <div className={styles.interns}>
                {data?.items.map((intern) => (
                  <ResponseCard
                    key={intern.id}
                    link={link}
                    responseInfo={intern}
                  />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={data?.totalItems ?? 1}
              />
            </>
          )}
        </>
      )}
    </div>
  )
}
