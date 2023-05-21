import Button from "components/base/controls/Button"
import styles from "./Pagination.module.scss"
import ChevronRightIcon from "assets/icons/chevron-right.svg"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"

interface Props {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
}

export default function Pagination({}: Props) {
  return (
    <div className={styles.container}>
      <Button className={styles.showMore} type="secondary">
        Показать больше
      </Button>
      <div className={styles.pagination}>
        <div className={styles.paginationEnd}>
          <ChevronLeftIcon className={styles.icon} />
          <span className={styles.page}>1</span>
        </div>
        <span className={styles.line}></span>
        <div className={styles.paginationCenter}>
          <span className={styles.page}>5</span>
          <span className={styles.page}>5</span>
          <span className={`${styles.page} ${styles.active}`}>5</span>
          <span className={styles.page}>5</span>
          <span className={styles.page}>5</span>
        </div>
        <span className={styles.line}></span>
        <div className={styles.paginationEnd}>
          <span className={styles.page}>1</span>
          <ChevronRightIcon className={styles.icon} />
        </div>
      </div>
    </div>
  )
}