import { Spin } from "antd"
import Tabs from "components/base/navigation/Tabs"
import ProfileFeedbacks from "components/main/ProfileFeedbacks"
import styles from "./Profile.module.scss"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchProfileInfo } from "data"
import { Role } from "models/Role"
import PersonalInfo from "./PersonalInfo"
import ExperienceInfo from "./ExperienceInfo"

export default function Profile() {
  const [activeTab, setActiveTab] = useState("personal")

  const { data, isLoading } = useQuery({
    queryKey: ["profileInfo"],
    queryFn: () => fetchProfileInfo(),
  })

  if (isLoading) return <Spin />

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Профиль</h1>
          <Tabs
            items={
              data?.role === Role.CANDIDATE || data?.role === Role.INTERN
                ? [
                    { key: "personal", value: "Личные данные" },
                    { key: "exp", value: "Опыт" },
                    { key: "feedbacks", value: "Отзывы" },
                  ]
                : [
                    { key: "personal", value: "Личные данные" },
                    { key: "feedbacks", value: "Отзывы" },
                  ]
            }
            value={activeTab}
            onChange={setActiveTab}
          />
        </div>
        {activeTab === "personal" && <PersonalInfo />}
        {activeTab === "exp" && <ExperienceInfo />}
        {activeTab === "feedbacks" && <ProfileFeedbacks />}
      </div>
    </>
  )
}
