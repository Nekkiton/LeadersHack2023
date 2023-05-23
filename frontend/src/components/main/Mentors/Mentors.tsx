import { useState } from "react"
import Link from "next/link"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import MentorCard from "components/base/user/MentorCard"
import Pagination from "components/base/navigation/Pagination"
import PlusIcon from "assets/icons/plus.svg"
import UserSearchIcon from "assets/icons/user-search.svg"
import SearchIcon from "assets/icons/search.svg"
import styles from "./Mentors.module.scss"

interface Props {
  link: string
  noHeader?: boolean
  longSearchInput?: boolean
}

export default function Mentors({ link, noHeader, longSearchInput }: Props) {
  const [query, setQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // TODO
  // fetch mentors
  // if user is curator and page is organization - filter by organization

  return (
    <div className={styles.container}>
      {!noHeader && (
        <div className={styles.header}>
          <h1 className={styles.title}>Наставники</h1>
          <Link href="/staff/add-mentor">
            <Button>
              <PlusIcon className="icon" />
              <span>Добавить наставника</span>
            </Button>
          </Link>
        </div>
      )}
      {/* TODO: if there are no mentors at all */}
      {false ? (
        <div className={styles.nothing}>
          <UserSearchIcon />
          <p>В вашей организации еще нет наставников</p>
          <Link href="/staff/add-mentor">
            <Button>
              <PlusIcon className="icon" />
              <span>Добавить наставника</span>
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.filters}>
            <Input
              className={`${styles.searchInput} ${
                longSearchInput ? styles.long : ""
              }`}
              placeholder="Поиск по наставникам"
              prefix={<SearchIcon />}
              value={query}
              onChange={setQuery}
            />
            {noHeader && (
              <Button>
                <PlusIcon className="icon" />
                <span>Добавить наставника</span>
              </Button>
            )}
          </div>
          <div className={styles.mentors}>
            {/* TODO: add mentor page */}
            <MentorCard link={link} />
            <MentorCard link={link} />
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={10}
          />
        </>
      )}
    </div>
  )
}
