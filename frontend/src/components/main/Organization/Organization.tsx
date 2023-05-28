import { useState } from "react"
import { Spin } from "antd"
import Link from "next/link"
import Button from "components/base/controls/Button"
import UserRating from "components/base/user/UserRating"
import Tabs from "components/base/navigation/Tabs"
import Vacancies from "components/main/Vacancies"
import Mentors from "components/main/Mentors"
import Staffs from "components/main/Staffs"
import Departments from "components/main/Departments"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import PhoneIcon from "assets/icons/phone.svg"
import EmailIcon from "assets/icons/mail.svg"
import styles from "./Organization.module.scss"
import { useQuery } from "@tanstack/react-query"
import { fetchOrganization } from "data"

interface Props {
  backLink: string
  id: string
}

export default function Organization({ backLink, id }: Props) {
  const [activeTab, setActiveTab] = useState("vacancies")

  const { data, isLoading } = useQuery({
    queryKey: ["organization", { id }],
    queryFn: () => fetchOrganization({ id }),
  })

  if (isLoading) return <Spin />

  return (
    <div className={styles.container}>
      <Link className={styles.backLink} href={backLink}>
        <Button type="text">
          <ChevronLeftIcon />
          <span>Вернуться к организациям</span>
        </Button>
      </Link>
      <h1 className={styles.title}>{data?.name}</h1>
      <div className={styles.contacts}>
        <div className={styles.contact}>
          <PhoneIcon />
          <span>{data?.phone}</span>
        </div>
        <div className={styles.contact}>
          <EmailIcon />
          <span>{data?.email}</span>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.address}>
          <span className={styles.addressDot}></span>
          <p>{data?.address}</p>
        </div>
        {/* TODO: fetch data */}
        <UserRating count={1} averageRate={2} />
      </div>
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        items={[
          { key: "vacancies", value: "Вакансии" },
          { key: "staffs", value: "Кадровые специалисты" },
          { key: "mentors", value: "Наставники" },
          { key: "deparments", value: "Подразделения" },
        ]}
      />
      {activeTab === "vacancies" && (
        <Vacancies
          link="/curator/vacancies"
          linkQuery={`?organization=${data?.id}`}
          noHeader
          organizationId="12"
        />
      )}
      {activeTab === "staffs" && (
        <Staffs addStaffLink={`/curator/add-staff?organization=${data?.id}`} />
      )}
      {activeTab === "mentors" && (
        <Mentors
          noHeader
          longSearchInput
          addMentorLink={`/curator/add-mentor?organization=${data?.id}`}
        />
      )}
      {activeTab === "deparments" && <Departments />}
    </div>
  )
}
