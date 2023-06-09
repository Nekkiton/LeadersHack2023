import { useState } from "react"
import { Spin } from "antd"
import Link from "next/link"
import Button from "components/base/controls/Button"
import RateUserModal from "components/main/modals/RateUser"
import Points from "components/base/Points"
import ResponseStatus from "components/base/vacancy/ResponseStatus"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import { useQuery } from "@tanstack/react-query"
import { fetchInternInfo, fetchUserInfo } from "data"
import styles from "./Intern.module.scss"
import StudentProfile from "components/main/StudentProfile"
import StudentInfo from "components/main/StudentProfile/StudentInfo"
import { Role } from "models/Role"

interface Props {
  backLink: string
  internId: string
}

export default function Intern({ backLink, internId }: Props) {
  const [isRateUserShowed, setIsRateUserShowed] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["internInfo", { id: internId }],
    queryFn: () =>
      fetchInternInfo({
        id: internId ?? "",
      }),
  })

  const userInfo = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => fetchUserInfo(),
  })
  
  if (!data || isLoading || !userInfo.data || userInfo.isLoading) return <Spin />
  const role = userInfo.data.role;

  return (
    <>
      <div className={styles.container}>
        <Link href={backLink}>
          <Button type="text">
            <ChevronLeftIcon className="icon" />
            <span>Вернуться к стажерам</span>
          </Button>
        </Link>
        <div className={styles.header}>
          <StudentInfo profile={data.user} />
          <div className={styles.headerControls}>
            {/* TODO: если еще не оценивали */}
            {role === Role.MENTOR && data.status === "internshipFinished" && (
              <Button onClick={() => setIsRateUserShowed(true)}>
                Оценить стажера
              </Button>
            )}
          </div>
        </div>
        <div className={styles.cards}>
          <StudentProfile profile={data} />
          <div className={`${styles.card} ${styles.complexCard}`}>
            <div className={styles.complexCardBlock}>
              <p className={styles.cardTitle}>Статус</p>
              <ResponseStatus status={data.status} />
            </div>
            <div className={styles.complexCardBlock}>
              <p className={styles.cardTitle}>Последнее место стажировки</p>
              {/* TODO: add data */}
              <div>{}</div>
            </div>
            {/* TODO: add data */}
            <Points score={data.score} details={[]} />
          </div>
        </div>
      </div>

      <RateUserModal
        isShowed={isRateUserShowed}
        setIsShowed={setIsRateUserShowed}
        role={role}
      />
    </>
  )
}
