import { useState } from "react"
import { Spin } from "antd"
import Link from "next/link"
import Button from "components/base/controls/Button"
import SetHackathonResultModal from "components/main/modals/SetHackathonResult"
import RateResumeModal from "components/main/modals/RateResume"
import Points from "components/base/Points"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import { useQuery } from "@tanstack/react-query"
import { fetchCandidateInfo, fetchUserInfo } from "data"
import styles from "./Candidate.module.scss"
import StudentProfile from "components/main/StudentProfile"
import StudentInfo from "components/main/StudentProfile/StudentInfo"
import Timeline from "components/base/controls/Timeline"
import { getCandidateStatuses, statusTitles } from "./getCandidateStatuses"
import { Role } from "models/Role"
import { getDetailScore, getTotalScore } from "./getTotalScore"
import { ApplicationStatus } from "models/InternshipApplication"

interface Props {
  backLink: string
  candidateId: string
}

export default function Candidate({ backLink, candidateId }: Props) {
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

  const userInfo = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => fetchUserInfo(),
  })
  const role = userInfo.data?.role

  if (!data || isLoading || userInfo.isLoading) return <Spin />

  const stProfile = {
    user: {
      phone: data.userProfile.phone,
      email: data.userProfile.email,
    },
    education: {
      name: data.candidateProfile.education.name,
      specialty: data.candidateProfile.education.specialty,
      graduationYear: data.candidateProfile.education.graduationYear,
    },
    schedule: data.candidateProfile.workSchedule,
    experience: data.candidateProfile.experience,
    projectActivity: data.candidateProfile.projectActivity,
    about: data.candidateProfile.about,
  }

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
            {role === Role.CURATOR &&
              data?.application.status === ApplicationStatus.moderation && (
                <Button onClick={() => setIsRateResumeShowed(true)}>
                  Оценить резюме
                </Button>
              )}
            {/* TODO: если результаты еще не внесены */}
            {role === Role.CURATOR &&
              data.application.status === ApplicationStatus.championship && (
                <Button onClick={() => setIsSetHackathonResultShowed(true)}>
                  Внести результаты кейс-чемпионата
                </Button>
              )}
          </div>
        </div>
        <div className={styles.cards}>
          <StudentProfile profile={stProfile} />
          <div className={`${styles.card} ${styles.complexCard}`}>
            <div className={styles.complexCardBlock}>
              <p className={styles.cardTitle}>Статус</p>
              <Timeline
                activeItem={data.application.status}
                itemList={getCandidateStatuses(
                  data.application.status,
                  data.application.data.rejectedOn
                )}
                itemTitles={statusTitles}
              />
              {data.application.status === ApplicationStatus.rejected &&
                data.application.data.rejectionReason && (
                  <div className={styles.statusComment}>
                    <p className={styles.statusCommentTitle}>
                      Причина отклонения
                    </p>
                    <p>{data.application.data.rejectionReason}</p>
                  </div>
                )}
            </div>
            {/* TODO: add data */}
            <Points
              score={getTotalScore(data.application.score)}
              details={getDetailScore(data.application.score)}
            />
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
