import Link from "next/link"
import { Spin } from "antd"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import OrganizationCard from "components/base/OrganizationCard"
import Pagination from "components/base/navigation/Pagination"
import PlusIcon from "assets/icons/plus.svg"
import SearchIcon from "assets/icons/search.svg"
import NothingIcon from "assets/icons/document-search.svg"
import styles from "./Organizations.module.scss"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchOrganizationList } from "data"

interface Props {
  link: string
}

export default function Vacancies({ link }: Props) {
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ["organizationList"],
    queryFn: fetchOrganizationList,
  })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Организации</h1>
        {(data || isLoading) && (
          <Link href="/curator/add-organization">
            <Button>
              <PlusIcon className="icon" />
              <span>Добавить организацию</span>
            </Button>
          </Link>
        )}
      </div>
      {isLoading ? (
        <Spin />
      ) : !data ? (
        <div className={styles.nothing}>
          <NothingIcon className={styles.nothingIcon} />
          <p className={styles.nothingText}>
            Еще не создано ни одной организации
          </p>
          <Link href="/curator/add-organization">
            <Button>
              <PlusIcon className="icon" />
              <span>Создать организацию</span>
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <Input
            className={styles.searchInput}
            prefix={<SearchIcon />}
            placeholder="Поиск по вакансиям"
          />
          <div className={styles.organizations}>
            <OrganizationCard link="/curator/organizations" />
            <OrganizationCard link="/curator/organizations" />
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
