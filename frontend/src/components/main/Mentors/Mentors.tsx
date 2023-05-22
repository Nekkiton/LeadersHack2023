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
}

export default function Mentors({ link, noHeader }: Props) {
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
              className={styles.searchInput}
              placeholder="Поиск по наставникам"
              prefix={<SearchIcon />}
            />
            {noHeader && (
              <Button>
                <PlusIcon className="icon" />
                <span>Добавить наставника</span>
              </Button>
            )}
          </div>
          <div className={styles.mentors}>
            <MentorCard link={link} />
            <MentorCard link={link} />
          </div>
          <Pagination />
        </>
      )}
    </div>
  )
}
