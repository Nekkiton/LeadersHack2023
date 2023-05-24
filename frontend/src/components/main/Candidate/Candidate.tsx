import { useState } from "react"
import { notification } from "antd"
import Link from "next/link"
import Button from "components/base/controls/Button"
import File from "components/base/controls/File"
import ResponseStatus from "components/base/vacancy/ResponseStatus"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import TimesIcon from "assets/icons/times.svg"
import ResponseCancelModal from "components/base/vacancy/ResponseCancelModal"
import { useQuery } from "@tanstack/react-query"
import { fetchVacancyResponseInfo } from "data"
import styles from "./Candidate.module.scss"
import StudentProfile from "components/main/StudentProfile"
import StudentInfo from "components/main/StudentProfile/StudentInfo"
import Timeline from "components/base/controls/Timeline"

interface Props {
  backLink: string
  responseId?: string
}

const userImg = "/images/user.svg"

export default function Candidate({ backLink, responseId }: Props) {
  const user = {
    role: "curator",
    //role: "mentor",
    //role: "staff",
  }

  const statuses = {
    accepted: "Заявка принята",
    moderation: "На модерации",
    education: "Проходит обучение",
    test: "Прошел тестирование",
    hackathon: "Проходит кейс-чемпионат",
    passed: "Отобран на стажировку",
  } as {
    [key: string]: string
  }

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
    notification.open({
      message: "Принято на стажировку",
      closeIcon: <TimesIcon />,
    })
  }

  // TODO: accept response, handle errors, notification text
  const acceptInterview = () => {
    notification.open({
      message: "Приглашено на собеседование",
      closeIcon: <TimesIcon />,
    })
  }

  const { data, isLoading } = useQuery({
    queryKey: ["vacancyResponseInfo", { id: responseId }],
    queryFn: () =>
      fetchVacancyResponseInfo({
        id: responseId ?? "",
      }),
  })

  if (!data || isLoading) return <div>Загрузка...</div>

  return (
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
          <Button type="secondary" onClick={toggleCancelModal}>
            Отклонить
          </Button>
          <Button onClick={acceptInternship}>Принять на стажировку</Button>
          {user.role === "mentor" && (
            <Button onClick={acceptInterview}>
              Пригласить на собеседование
            </Button>
          )}
          {user.role === "mentor" && <Button>Оценить стажера</Button>}
          {user.role === "curator" && <Button>Оценить резюме</Button>}
          {user.role === "curator" && (
            <Button>Внести результаты кейс-чемпионата</Button>
          )}
        </div>
      </div>
      <div className={styles.cards}>
        <StudentProfile profile={data} />
        <div className={`${styles.card} ${styles.complexCard}`}>
          <div className={styles.complexCardBlock}>
            <p className={styles.cardTitle}>Статус</p>
            <Timeline statuses={statuses} activeStatus={data.status} />
          </div>
          <div className={styles.statusComment}>
            <p className={styles.statusCommentTitle}>Причина отклонения</p>
            <p>{data.rejectionReason}</p>
          </div>
          <div className={styles.complexCardBlock}>
            <p className={styles.cardTitle}>Тестовое задание</p>
            <File name={data.testTask.fileName} size={data.testTask.fileSize} />
          </div>
          <div className={styles.complexCardBlock}>
            <p className={styles.cardTitle}>Сопроводительное письмо</p>
            <div>{data.coveringLetter}</div>
          </div>
          {/* TODO: add component */}
          <div>*еще баллы*</div>
        </div>
      </div>
    </div>
  )
}
