import { useState } from "react"
import { Spin } from "antd"
import Link from "next/link"
import Button from "components/base/controls/Button"
import SetHackathonResultModal from "components/main/modals/SetHackathonResult"
import RateResumeModal from "components/main/modals/RateResume"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import { useQuery } from "@tanstack/react-query"
import { fetchCandidateInfo } from "data"
import styles from "./Candidate.module.scss"
import StudentProfile from "components/main/StudentProfile"
import StudentInfo from "components/main/StudentProfile/StudentInfo"
import Timeline from "components/base/controls/Timeline"
import { getCandidateStatuses, statusTitles } from "./getCandidateStatuses"

interface Props {
  backLink: string
  candidateId: string
}

export default function Candidate({ backLink, candidateId }: Props) {
  const user = {
    role: "curator",
    //role: "mentor",
    //role: "staff",
  }

  const [isRateResumeShowed, setIsRateResumeShowed] = useState(false)
  const [isSetHackathonResultShowed, setIsSetHackathonResultShowed] =
    useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["fetchCandidateInfo", { id: candidateId }],
    queryFn: () =>
      fetchCandidateInfo({
        id: candidateId ?? "",
      }),
  })

  if (!data || isLoading) return <Spin />

  return (
    <>
      <div className={styles.container}>
        <Link href={backLink}>
          <Button type="text">
            <ChevronLeftIcon className="icon" />
            <span>Вернуться к кандидатам</span>
          </Button>
        </Link>
        <div className={styles.header}>
          <StudentInfo profile={data.user} />
          <div className={styles.headerControls}>
            {/* TODO: если резюме не оценено еще? */}
            {user.role === "curator" && (
              <Button onClick={() => setIsRateResumeShowed(true)}>
                Оценить резюме
              </Button>
            )}
            {/* TODO: если результаты еще не внесены */}
            {user.role === "curator" && data.status === "hackathon" && (
              <Button onClick={() => setIsSetHackathonResultShowed(true)}>
                Внести результаты кейс-чемпионата
              </Button>
            )}
          </div>
        </div>
        <div className={styles.cards}>
          <StudentProfile profile={data} />
          <div className={`${styles.card} ${styles.complexCard}`}>
            <div className={styles.complexCardBlock}>
              <p className={styles.cardTitle}>Статус</p>
              <Timeline
                activeItem={data.status}
                itemList={getCandidateStatuses(
                  data.status,
                  data.previousStatus
                )}
                itemTitles={statusTitles}
              />
            </div>
            <div className={styles.complexCardBlock}>
              <p className={styles.cardTitle}>Набрано баллов</p>
              <div>{data.score}</div>
            </div>
            {/* TODO: add section in accordance with Figma
            https://www.figma.com/file/VMVVobtgBWqyjIvENBvTCO/%D0%9B%D0%A6%D0%A2-23%2F16?type=design&node-id=5602%3A14124&t=gNGKlJ35OxQRDtPf-1          */}
          </div>
        </div>
      </div>

      <SetHackathonResultModal
        isShowed={isSetHackathonResultShowed}
        setIsShowed={setIsSetHackathonResultShowed}
      />

      <RateResumeModal
        isShowed={isRateResumeShowed}
        setIsShowed={setIsRateResumeShowed}
      />
    </>
  )
}
