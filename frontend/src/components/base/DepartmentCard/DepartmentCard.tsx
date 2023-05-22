import Link from "next/link"
import TrashIcon from "assets/icons/trash.svg"
import PenIcon from "assets/icons/pen.svg"
import styles from "./DepartmentCard.module.scss"

interface Props {
  link: string
}

export default function DepartmentCard({ link }: Props) {
  return (
    <Link className={styles.card} href={`${link}/hel`}>
      <p className={styles.name}>Юридический отдел</p>
      <div className={styles.controls}>
        <PenIcon className={styles.icon} />
        <TrashIcon className={`${styles.icon} ${styles.danger}`} />
      </div>
    </Link>
  )
}
