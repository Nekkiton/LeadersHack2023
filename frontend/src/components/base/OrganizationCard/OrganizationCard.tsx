import Link from "next/link"
import Button from "components/base/controls/Button"
import styles from "./OrganizationCard.module.scss"
import { Organization } from "models/Organization"

interface Props {
  link: string
  organization: Organization
}

export default function OrganizationCard({ link, organization }: Props) {
  return (
    <Link className={styles.card} href={`${link}/${organization.id}`}>
      <p className={styles.name}>{organization.name}</p>
      <div className={styles.info}>
        <div className={styles.address}>
          <span className={styles.addressDot}></span>
          <p>{organization.address}</p>
        </div>
        <div className={styles.infoValues}>
          {/* TODO: fetch data */}
          <p>Подразделений: 0</p>
          <Button
            className={false ? styles.infoValuesDisabled : ""}
            type="text"
          >
            Открытых вакансий: 0
          </Button>
        </div>
      </div>
    </Link>
  )
}
