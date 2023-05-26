import { useState } from "react"
import { Spin } from "antd"
import Link from "next/link"
import Button from "components/base/controls/Button"
import RateUserModal from "components/main/modals/RateUser"
import ResponseStatus from "components/base/vacancy/ResponseStatus"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import { useQuery } from "@tanstack/react-query"
import { fetchInternInfo } from "data"
import styles from "./Intern.module.scss"
import StudentProfile from "components/main/StudentProfile"
import StudentInfo from "components/main/StudentProfile/StudentInfo"

interface Props {
  backLink: string
  internId: string
}

export default function Intern({ backLink, internId }: Props) {
  const user = {
    //role: "curator",
    role: "mentor",
    //role: "staff",
  }

  const [isRateUserShowed, setIsRateUserShowed] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["internInfo", { id: internId }],
    queryFn: () =>
      fetchInternInfo({
        id: internId ?? "",
      }),
  })

  if (!data || isLoading) return <Spin />

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
            {user.role === "mentor" && data.status === "internshipFinished" && (
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
              <div>{}</div>
            </div>
            <div className={styles.complexCardBlock}>
              <p className={styles.cardTitle}>Набрано баллов</p>
              <div>{data.score}</div>
            </div>
            {/* TODO: add section in accordance with Figma
            https://www.figma.com/file/VMVVobtgBWqyjIvENBvTCO/%D0%9B%D0%A6%D0%A2-23%2F16?type=design&node-id=5526%3A31653&t=gNGKlJ35OxQRDtPf-1
          */}
          </div>
        </div>
      </div>

      <RateUserModal
        isShowed={isRateUserShowed}
        setIsShowed={setIsRateUserShowed}
        role="intern"
      />
    </>
  )
}
