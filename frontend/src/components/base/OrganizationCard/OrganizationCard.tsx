import Link from "next/link"
import Button from "components/base/controls/Button"
import styles from "./OrganizationCard.module.scss"

interface Props {
  link: string
}

export default function OrganizationCard({ link }: Props) {
  return (
    <Link className={styles.card} href={`${link}/123`}>
      <p className={styles.name}>Карьерный центр Правительства Москвы</p>
      <div className={styles.info}>
        <div className={styles.address}>
          <span className={styles.addressDot}></span>
          <p>Калужская, ул. Большая Дмитровка, 7/5</p>
        </div>
        <div className={styles.infoValues}>
          <p>Подразделений: 12</p>
          <Button
            className={false ? styles.infoValuesDisabled : ""}
            type="text"
          >
            Открытых вакансий: 12
          </Button>
        </div>
      </div>
    </Link>
  )
}
