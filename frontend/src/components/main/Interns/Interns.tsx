import Input from "components/base/controls/Input"
import ResponseCard from "components/base/vacancy/ResponseCard"
import Pagination from "components/base/navigation/Pagination"
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
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ["mentorList", { query, page: currentPage }],
    queryFn: () =>
      fetchInternList({
        search: query,
        page: currentPage,
      }),
  })

  if (isLoading) return <Spin />

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
          <Input
            className={styles.searchInput}
            placeholder="Поиск по стажерам"
            prefix={<SearchIcon />}
            value={query}
            onChange={setQuery}
          />
          <div className={styles.interns}>
            {data?.items.map((intern) => (
              <ResponseCard key={intern.id} link={link} responseInfo={intern} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={data?.totalPages ?? 1}
          />
        </>
      )}
    </div>
  )
}
