import { useState } from "react"
import { notification } from "antd"
import Link from "next/link"
import Button from "components/base/controls/Button"
import File from "components/base/controls/File"
import ResponseStatus from "components/base/vacancy/ResponseStatus"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import UserRating from "components/base/user/UserRating"
import TimesIcon from "assets/icons/times.svg"
import ResponseCancelModal from "components/base/vacancy/ResponseCancelModal"
import { useQuery } from "@tanstack/react-query"
import { fetchVacancyResponseInfo } from "data/fetchVacancyResponseInfo"
import styles from "./Candidate.module.scss"
import StudentProfile from "components/main/StudentProfile"

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
        <div className={styles.user}>
          <img className={styles.userImg} src={data.user.avatar ?? userImg} />
          <div className={styles.userInfoContainer}>
            <h1 className={styles.userName}>{data.user.name}</h1>
            <div className={styles.userInfo}>
              <p>
                {data.user.age} года, {data.user.address}
              </p>
              <UserRating
                count={data.user.reviews.count}
                averageRate={data.user.reviews.averageRate}
              />
            </div>
          </div>
        </div>
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
            <p className={styles.cardTitle}>Статус отклика</p>
            <ResponseStatus status={data.status} />
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
