import Link from "next/link"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import StaffCard from "components/base/user/StaffCard"
import Pagination from "components/base/navigation/Pagination"
import PlusIcon from "assets/icons/plus.svg"
import SearchIcon from "assets/icons/search.svg"
import styles from "./Staffs.module.scss"
import { useState } from "react"

interface Props {
  link: string
}

export default function Staffs({ link }: Props) {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Input
          className={styles.searchInput}
          placeholder="Поиск по кадровым специалистам"
          prefix={<SearchIcon />}
        />
        <Button>
          <PlusIcon className="icon" />
          <span>Добавить кадрового специалиста</span>
        </Button>
      </div>
      <div className={styles.mentors}>
        <StaffCard link={link} />
        <StaffCard link={link} />
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={500} // take from data response
      />
    </div>
  )
}
