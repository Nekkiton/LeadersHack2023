import Link from "next/link"
import Button from "components/base/controls/Button"
import Select from "components/base/controls/Select"
import Input from "components/base/controls/Input"
import Pagination from "components/base/navigation/Pagination"
import MailingCard from "components/base/MailingCard"
import PlusIcon from "assets/icons/plus.svg"
import SearchIcon from "assets/icons/search.svg"
import UploadIcon from "assets/icons/upload.svg"
import styles from "./Mailing.module.scss"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchMailingList } from "data"
import { Spin } from "antd"

interface Props {
  link: string
}

export default function Mailing({ link }: Props) {
  const [query, setQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ["mailingList", { query, page: currentPage }],
    queryFn: () =>
      fetchMailingList({
        search: query,
        page: currentPage,
      }),
  });

  if (isLoading) return <Spin />

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Рассылки</h1>
        <Link href="/curator/add-mailing">
          <Button>
            <PlusIcon className="icon" />
            <span>Создать рассылку</span>
          </Button>
        </Link>
      </div>
      {!data?.items ? (
        <div className={styles.nothing}>
          <UploadIcon className={styles.nothingIcon} />
          <p className={styles.nothingText}>Вы еще не делали рассылок</p>
          <Link href="/curator/add-mailing">
            <Button>
              <PlusIcon className="icon" />
              <span>Создать рассылку</span>
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
                placeholder="Поиск по теме"
              />
              <Select
                className={styles.filtersSelect}
                placeholder="Все типы"
                multiple
              />
              <Select
                className={styles.filtersSelect}
                placeholder="Всем получателям"
                multiple
              />
            </div>
          </div>
          <div className={styles.vacancies}>
            {
              data.items.map(item => (
                <MailingCard link={link} item={item}/>
              ))
            }
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
