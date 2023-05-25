import DepartmentCard from "components/base/DepartmentCard"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import Pagination from "components/base/navigation/Pagination"
import PlusIcon from "assets/icons/plus.svg"
import SearchIcon from "assets/icons/search.svg"
import styles from "./Departments.module.scss"
import { useState } from "react"

interface Props {
  link: string
}

export default function Departments({ link }: Props) {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Input
          className={styles.searchInput}
          placeholder="Поиск по подразделениям"
          prefix={<SearchIcon />}
        />
        <Button>
          <PlusIcon className="icon" />
          <span>Добавить кадрового подразделение</span>
        </Button>
      </div>
      <div className={styles.mentors}>
        <DepartmentCard link={link} />
        <DepartmentCard link={link} />
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={500} // take from data response
      />
    </div>
  )
}
