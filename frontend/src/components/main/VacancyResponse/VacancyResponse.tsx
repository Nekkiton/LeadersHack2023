import { useState } from "react"
import { Spin, notification } from "antd"
import Link from "next/link"
import Button from "components/base/controls/Button"
import File from "components/base/controls/File"
import Points from "components/base/Points"
import ResponseStatus from "components/base/vacancy/ResponseStatus"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import TimesIcon from "assets/icons/times.svg"
import ResponseCancelModal from "components/base/vacancy/ResponseCancelModal"
import InterviewInviteModal from "components/main/modals/InterviewInvite"
import { useQuery } from "@tanstack/react-query"
import { fetchUserInfo, fetchVacancyResponseInfo } from "data"
import styles from "./VacancyResponse.module.scss"
import StudentProfile from "components/main/StudentProfile"
import StudentInfo from "components/main/StudentProfile/StudentInfo"
import { Role } from "models/Role"

interface Props {
  backLink: string
  responseId?: string
}

export default function VacancyResponse({ backLink, responseId }: Props) {
  const [isInterviewInviteShowed, setIsInterviewInviteShowed] = useState(false)
  const [isCancelModalShowed, setIsCancelModalShowed] = useState(false)
  const toggleCancelModal = () => setIsCancelModalShowed((prev) => !prev)

  // TODO: validate modal data, cancel response, handle errors
  const cancelResponse = () => {
    toggleCancelModal()
    notification.open({
      message: "Отклик отклонен",
      closeIcon: <TimesIcon />,
    })
  }

  // TODO: accept response, handle errors, notification text
  const acceptInternship = () => {
    if (role === Role.STAFF) {
      notification.open({
        message: "Принято на стажировку",
        closeIcon: <TimesIcon />,
      })
    } else if (role === Role.MENTOR) {
      notification.open({
        message:
          "Мы сообщили о вашем решении кадровому специалисту. После его подтверждения стажер будет принят на стажировку",
        closeIcon: <TimesIcon />,
      })
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ["vacancyResponseInfo", { id: responseId }],
    queryFn: () =>
      fetchVacancyResponseInfo({
        id: responseId ?? "",
      }),
  })

  const userInfo = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => fetchUserInfo(),
  })
  const role = userInfo.data?.role;

  if (!data || isLoading || userInfo.isLoading) return <Spin />

  return (
    <>
      <div className={styles.container}>
        <ResponseCancelModal
          isOpen={isCancelModalShowed}
          onCancel={toggleCancelModal}
          onOk={cancelResponse}
        />

        <Link href={backLink}>
          <Button type="text">
            <ChevronLeftIcon className="icon" />
            <span>Вернуться к вакансии</span>
          </Button>
        </Link>
        <div className={styles.header}>
          <StudentInfo profile={data.user} />
          {/* TODO: Manage buttons visibility, add modal */}
          <div className={styles.headerControls}>
            {role === Role.STAFF && data.status === "mentorAccepted" && (
              <>
                <Button type="secondary" onClick={toggleCancelModal}>
                  Отклонить
                </Button>
                <Button onClick={acceptInternship}>
                  Принять на стажировку
                </Button>
              </>
            )}
            {role === Role.MENTOR && (
              <>
                {(data.status === "new" ||
                  data.status === "old" ||
                  data.status === "interview") && (
                  <Button type="secondary" onClick={toggleCancelModal}>
                    Отклонить
                  </Button>
                )}
                {(data.status === "new" || data.status === "old") && (
                  <Button onClick={() => setIsInterviewInviteShowed(true)}>
                    Пригласить на собеседование
                  </Button>
                )}
                {data.status === "interview" && (
                  <Button onClick={acceptInternship}>
                    Принять на стажировку
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
        <div className={styles.cards}>
          <StudentProfile profile={data} />
          <div className={`${styles.card} ${styles.complexCard}`}>
            <div className={styles.complexCardBlock}>
              <p className={styles.cardTitle}>Статус отклика</p>
              <ResponseStatus status={data.status} />
            </div>
            {data.status === "rejected" && data.rejectionReason && (
              <div className={styles.statusComment}>
                <p className={styles.statusCommentTitle}>Причина отклонения</p>
                <p>{data.rejectionReason}</p>
              </div>
            )}
            <div className={styles.complexCardBlock}>
              <p className={styles.cardTitle}>Тестовое задание</p>
              <File
                name={data.testTask.fileName}
                size={data.testTask.fileSize}
              />
            </div>
            <div className={styles.complexCardBlock}>
              <p className={styles.cardTitle}>Сопроводительное письмо</p>
              <div>{data.coveringLetter}</div>
            </div>
            {/* TODO: add data */}
            <Points score={data.score} details={[]} />
          </div>
        </div>
      </div>

      <InterviewInviteModal
        isShowed={isInterviewInviteShowed}
        setIsShowed={setIsInterviewInviteShowed}
        phone={data.user.phone}
        email={data.user.email}
      />
    </>
  )
}
