import Link from "next/link"
import Button from "components/base/controls/Button"
import UserRating from "components/base/user/UserRating"
import Tabs from "components/base/navigation/Tabs"
import Vacancies from "components/main/Vacancies"
import Mentors from "components/main/Mentors"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import PhoneIcon from "assets/icons/phone.svg"
import EmailIcon from "assets/icons/mail.svg"
import styles from "./Organization.module.scss"

interface Props {
  backLink: string
}

export default function Organization({ backLink }: Props) {
  return (
    <div className={styles.container}>
      <Link className={styles.backLink} href={backLink}>
        <Button type="text">
          <ChevronLeftIcon />
          <span>Вернуться к организациям</span>
        </Button>
      </Link>
      <h1 className={styles.title}>Карьерный центр Правительства Москвы</h1>
      <div className={styles.contacts}>
        <div className={styles.contact}>
          <PhoneIcon />
          <span>+7 (910) 234-56-78</span>
        </div>
        <div className={styles.contact}>
          <EmailIcon />
          <span>marina@gmail.com</span>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.address}>
          <span className={styles.addressDot}></span>
          <p>Калужская, ул. Большая Дмитровка, 7/5</p>
        </div>
        <UserRating count={1} averageRate={2} />
      </div>
      <Tabs
        defaultTab={0}
        items={[
          {
            title: "Вакансии",
            content: <Vacancies link="/curator/vacancies" noHeader />,
          },
          { title: "Кадровые специалисты", content: <div>ss</div> },
          { title: "Наставники", content: <Mentors link="/" noHeader /> },
          { title: "Подразделения", content: <div>ss</div> },
        ]}
      />
    </div>
  )
}
