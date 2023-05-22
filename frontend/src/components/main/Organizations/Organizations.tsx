import Link from "next/link"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import OrganizationCard from "components/base/OrganizationCard"
import Pagination from "components/base/navigation/Pagination"
import PlusIcon from "assets/icons/plus.svg"
import SearchIcon from "assets/icons/search.svg"
import NothingIcon from "assets/icons/document-search.svg"
import styles from "./Organizations.module.scss"

interface Props {
  link: string
}

export default function Vacancies({ link }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Организации</h1>
        <Link href="/curator/add-organization">
          <Button>
            <PlusIcon className="icon" />
            <span>Добавить организацию</span>
          </Button>
        </Link>
      </div>
      {false ? (
        <div className={styles.nothing}>
          <NothingIcon className={styles.nothingIcon} />
          <p className={styles.nothingText}>no organizations</p>
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
          <Pagination />
        </>
      )}
    </div>
  )
}
