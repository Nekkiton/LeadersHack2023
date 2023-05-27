import Link from "next/link"
import { useRouter } from "next/router"
import Button from "components/base/controls/Button"
import UserRating from "components/base/user/UserRating"
import VacancyResponses from "components/base/vacancy/Responses"
import styles from "./Vacancy.module.scss"
import File from "components/base/controls/File"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import CopyIcon from "assets/icons/copy.svg"
import Status from "components/base/vacancy/Status"
import PenIcon from "assets/icons/pen.svg"
import MakeResponseModal from "components/main/modals/MakeResponse"
import CancelVacancyModal from "components/main/modals/CancelVacancy"
import MakeInternshipFeedbackModal from "components/main/modals/MakeInternshipFeedback"
import PlusIcon from "assets/icons/plus.svg"
import TimesIcon from "assets/icons/times.svg"
import LinkExternalIcon from "assets/icons/link-external.svg"
import DocumentIcon from "assets/icons/document2.svg"
import { useQuery } from "@tanstack/react-query"
import { fetchUserInfo, fetchVacancyInfo } from "data"
import { useState } from "react"
import AddTestTaskModal from "./AddTestTaskModal"
import { Spin, notification } from "antd"
import Timeline from "components/base/controls/Timeline"
import { getVacancyStatuses, statusTitles } from "./getVacancyStatuses"
import { Role } from "models/Role"

interface Props {
  backLink: string
  link: string
}

const userImg = "/images/user.svg"

export default function Vacancy({ backLink, link }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const [isMakeResponseShowed, setIsMakeResponseShowed] = useState(false)
  const [isMakeFeedbackShowed, setIsMakeFeedbackShowed] = useState(false)
  const [isCancelVacancyShowed, setIsCancelVacancyShowed] = useState(false)

  const [editTestTask, setEditTestTask] = useState({})

  const startTestTaskEditing = () => {
    if (data) {
      setEditTestTask(data.testTask)
      toggleModal()
    }
  }

  // TODO: create and edit test task, handle errors
  const addTestTask = (data: any) => {
    console.log(data)
    toggleModal()
    notification.open({
      message:
        "Вакансия и тестовое задание отправлены на модерацию. Обычно она занимает не более 3 рабочих дней",
      closeIcon: <TimesIcon />,
    })
  }

  const acceptVacancy = () => {
    notification.open({
      message: "Вакансия согласована",
      closeIcon: <TimesIcon />,
    })
  }

  const { query, asPath } = useRouter()

  const { data, isLoading } = useQuery({
    queryKey: ["vacancyInfo", { id: query.id }],
    queryFn: () =>
      fetchVacancyInfo({
        id: query.id as string,
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
      <div className={styles.vacancy}>
        {/* TODO: finish modal */}
        <AddTestTaskModal
          isOpen={isModalOpen}
          onCancel={toggleModal}
          onFinish={addTestTask}
          initialValues={editTestTask}
        />
        <Link className={styles.topLink} href={backLink}>
          <Button type="text">
            <ChevronLeftIcon className="icon" />
            <span>Вернуться к вакансиям</span>
          </Button>
        </Link>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>{data.title}</h1>
          <div className={styles.headerControls}>
            {role === Role.STAFF && (
              <>
                <Link href={`/staff/add-vacancy?copy=${data.id}`}>
                  <Button type="text">
                    <CopyIcon className="icon" />
                    <span>Создать копию</span>
                  </Button>
                </Link>
                {(data.status === "testTask" ||
                  data.status === "moderating" ||
                  data.status === "archived") && (
                  <Link href={`${asPath}/edit`}>
                    <Button type="secondary">
                      <PenIcon className="icon" />
                      <span>Редактировать</span>
                    </Button>
                  </Link>
                )}
              </>
            )}
            {role === Role.MENTOR && (
              <>
                {data.status === "testTask" && (
                  <Button onClick={toggleModal}>
                    <PlusIcon className="icon" />
                    <span>Добавить тестовое задание</span>
                  </Button>
                )}
                {(data.status === "moderating" ||
                  data.status === "rejected") && (
                  <Button type="secondary" onClick={startTestTaskEditing}>
                    <PenIcon className="icon" />
                    <span>Редактировать тестовое задание</span>
                  </Button>
                )}
              </>
            )}
            {role === Role.CURATOR && data.status === "moderating" && (
              <>
                <Button
                  type="secondary"
                  onClick={() => setIsCancelVacancyShowed(true)}
                >
                  Отклонить
                </Button>
                <Button onClick={acceptVacancy}>Согласовать</Button>
              </>
            )}
            {/* TODO: also if intern does not have response to this vacancy */}
            {/* TODO: add action (modal) */}
            {role === Role.INTERN && data?.status === "active" && (
              <Button onClick={() => setIsMakeResponseShowed(true)}>
                Отлкикнуться
              </Button>
            )}
            {/* TODO: add action, show when internship is finished */}
            {role === Role.INTERN && (
              <Button onClick={() => setIsMakeFeedbackShowed(true)}>
                Оценить стажировку
              </Button>
            )}
          </div>
        </div>
        {role === Role.INTERN && (
          <Status className={styles.mobileStatus} status={data?.status} />
        )}
        <div className={styles.organization}>
          <p className={styles.organizationName}>{data.company.name}</p>
          <div className={styles.organizationInfo}>
            <div className={styles.organizationAddress}>
              <span className={styles.organizationAddressDot}></span>
              <span>{data?.company.address}</span>
            </div>
            <UserRating
              count={data.company.reviews.count}
              averageRate={data.company.reviews.averageRate}
            />
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.responsesContainer}>
            <div className={styles.vCards}>
              <div className={styles.hCards}>
                <div className={styles.card}>
                  <p className={styles.cardTitle}>Наставник</p>
                  <div className={styles.mentor}>
                    <img
                      className={styles.mentorImg}
                      src={data.mentor.avatar ?? userImg}
                    />
                    <div>
                      <p>{data?.mentor.name}</p>
                      <UserRating
                        count={data.mentor.reviews.count}
                        averageRate={data.mentor.reviews.averageRate}
                      />
                    </div>
                  </div>
                </div>
                <div className={`${styles.hCards} ${styles.mobileHCards}`}>
                  <div className={styles.card}>
                    <p className={styles.cardTitle}>Даты стажировки</p>
                    <p>
                      {/* TODO: human view */}
                      {data.internship.startDate} - {data.internship.endDate}
                    </p>
                  </div>
                  <div className={styles.card}>
                    <p className={styles.cardTitle}>Направление</p>
                    {/* TODO: fetch data */}
                    <p>Комфортная городская среда</p>
                  </div>
                </div>
              </div>
              <div className={styles.card}>
                <p className={styles.cardTitle}>Описание</p>
                <p>{data.description}</p>
              </div>
              {data.testTask && data.status !== "testTask" && (
                <div className={styles.card}>
                  <p className={styles.cardTitle}>Тестовое задание</p>
                  <p>{data.testTask.description}</p>
                  <div className={styles.file}>
                    <div className={styles.fileNameContainer}>
                      <DocumentIcon className={styles.fileIcon} />
                      <span>{data.testTask.fileName}</span>
                    </div>
                    <span className={styles.fileSize}>
                      {data.testTask.fileSize}
                    </span>
                  </div>
                </div>
              )}
              {/* TODO: also if intern doesn't have response to this vacancy */}
              {role === Role.INTERN && data.status === "active" && (
                <div className={styles.bottomCard}>
                  {/* TODO: manage visibility */}
                  {true && (
                    <Button onClick={() => setIsMakeResponseShowed(true)}>
                      Откликнуться
                    </Button>
                  )}
                  {/* TODO: fetch status */}
                  {false && <Button>Оценить стажировку</Button>}
                </div>
              )}
            </div>
            {(role === Role.CURATOR ||
              role === Role.STAFF ||
              role === Role.MENTOR) && (
              <VacancyResponses
                link={`${link}/${data.id}/responses`}
                responses={data.responses.items}
                responsesCount={data.responses.count}
                responsesCountNew={data.responses.countNew}
              />
            )}
          </div>
          <div className={styles.vCards}>
            {/* TODO: show if user has response to this vacancy, fetch response */}
            {role === Role.INTERN && (
              <div className={`${styles.card} ${styles.complexCard}`}>
                <div className={styles.complexCardBlock}>
                  <p className={styles.cardTitle}>Статус отклика</p>
                  <Status status="active" />
                  {/* TODO: show if rejected */}
                  <div className={styles.statusComment}>
                    <p className={styles.statusCommentTitle}>
                      Причина отклонения
                    </p>
                    <p className={styles.statusCommentText}>
                      К сожалению, пока что мы не можем принять вас на
                      стажировку. Попробуйте в следующем году
                    </p>
                  </div>
                </div>
                <div className={styles.complexCardBlock}>
                  <p className={styles.cardTitle}>Мой отклик</p>
                  <p>
                    Прежде всего, постоянное информационно-пропагандистское
                    обеспечение нашей деятельности, в своём классическом
                    представлении, допускает внедрение приоретизации разума над
                    эмоциями.
                  </p>
                </div>
                <div className={styles.complexCardBlock}>
                  <p className={styles.cardTitle}>Тестовое задание</p>
                  <File name="fff.pdf" size="2 Gb" />
                </div>
              </div>
            )}
            {role === Role.INTERN && (
              <div className={`${styles.card} ${styles.desktop}`}>
                <p className={styles.cardTitle}>Статус вакансии</p>
                <Status status={data?.status} />
              </div>
            )}
            {(role === Role.STAFF ||
              role === Role.CURATOR ||
              role === Role.MENTOR) && (
              <div className={`${styles.card} ${styles.rightCard}`}>
                <p className={styles.cardTitle}>Статус</p>
                <Timeline
                  itemList={getVacancyStatuses(data.status)}
                  itemTitles={statusTitles}
                  activeItem={data.status}
                />
                {data.status === "rejected" && data.rejectionReason && (
                  <div className={styles.statusComment}>
                    <p className={styles.statusCommentTitle}>
                      Причина отклонения
                    </p>
                    <p className={styles.statusCommentText}>
                      {data.rejectionReason}
                    </p>
                  </div>
                )}
                {/* TODO: add link */}
                <Button type="text">
                  <span>Подробнее о смене статусов</span>
                  <LinkExternalIcon className="icon" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <MakeResponseModal
        isShowed={isMakeResponseShowed}
        setIsShowed={setIsMakeResponseShowed}
      />

      <MakeInternshipFeedbackModal
        isShowed={isMakeFeedbackShowed}
        setIsShowed={setIsMakeFeedbackShowed}
      />

      <CancelVacancyModal
        isShowed={isCancelVacancyShowed}
        setIsShowed={setIsCancelVacancyShowed}
      />
    </>
  )
}
