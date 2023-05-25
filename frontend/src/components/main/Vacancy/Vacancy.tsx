import Link from "next/link"
import { Form } from "antd"
import { useRouter } from "next/router"
import Button from "components/base/controls/Button"
import UserRating from "components/base/user/UserRating"
import VacancyResponses from "components/base/vacancy/Responses"
import Input from "components/base/controls/Input"
import styles from "./Vacancy.module.scss"
import File from "components/base/controls/File"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import CopyIcon from "assets/icons/copy.svg"
import Status from "components/base/vacancy/Status"
import PenIcon from "assets/icons/pen.svg"
import Popup from "components/base/controls/Popup"
import PaperclipIcon from "assets/icons/paperclip.svg"
import PlusIcon from "assets/icons/plus.svg"
import TimesIcon from "assets/icons/times.svg"
import LinkExternalIcon from "assets/icons/link-external.svg"
import DocumentIcon from "assets/icons/document2.svg"
import { useQuery } from "@tanstack/react-query"
import { fetchVacancyInfo } from "data"
import { useState } from "react"
import AddTestTaskModal from "./AddTestTaskModal"
import { Spin, notification } from "antd"
import Timeline from "components/base/controls/Timeline"

interface Props {
  backLink: string
  link: string
}

const userImg = "/images/user.svg"

export default function Vacancy({ backLink, link }: Props) {
  const user = {
    //role: "staff",
    //role: "mentor",
    role: "intern",
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const [isResponsePopupShowed, setIsResponsePopupShowed] = useState(false)

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

  const { query, asPath } = useRouter()

  const { data, isLoading } = useQuery({
    queryKey: ["vacancyInfo", { id: query.id }],
    queryFn: () =>
      fetchVacancyInfo({
        id: query.id as string,
      }),
  })

  if (!data || isLoading) return <Spin />

  const statuses = {
    created: "Создана",
    testTask: "Добавление тестового задания",
    moderating: "На модерации",
    active: "Активна",
    archived: "В архиве",
  } as {
    [key: string]: string
  }

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
            {user.role === "staff" && (
              <>
                <Link href={`/staff/add-vacancy?copy=${data.id}`}>
                  <Button type="text">
                    <CopyIcon className="icon" />
                    <span>Создать копию</span>
                  </Button>
                </Link>
                {/* TODO: show when status is lower then active */}
                {true && (
                  <Link href={`${asPath}/edit`}>
                    <Button type="secondary">
                      <PenIcon className="icon" />
                      <span>Редактировать</span>
                    </Button>
                  </Link>
                )}
              </>
            )}
            {user.role === "mentor" && (
              <>
                {/* TODO: show if status is testTask */}
                {true && (
                  <Button onClick={toggleModal}>
                    <PlusIcon className="icon" />
                    <span>Добавить тестовое задание</span>
                  </Button>
                )}
                {/* TODO: show if status is moderating or rejected */}
                {true && (
                  <Button type="secondary" onClick={startTestTaskEditing}>
                    <PenIcon className="icon" />
                    <span>Редактировать тестовое задание</span>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
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
              {/* TODO: show if candidate response status is rejected; fetch data */}
              {user.role === "intern" && (
                <div className={`${styles.card} ${styles.statusComment}`}>
                  <p className={styles.cardTitle}>Причина отклонения</p>
                  <p>
                    К сожалению, пока что мы не можем принять вас на стажировку.
                    Попробуйте в следующем году
                  </p>
                </div>
              )}
              {/* TODO: show if candidate response status is accepted; fetch data */}
              {user.role === "intern" && (
                <div className={styles.card}>
                  <p className={styles.cardTitle}>Мой отклик</p>
                  <p>
                    Прежде всего, постоянное информационно-пропагандистское
                    обеспечение нашей деятельности, в своём классическом
                    представлении, допускает внедрение приоретизации разума над
                    эмоциями.
                  </p>
                  <p className={styles.cardTitle}>Тестовое задание</p>
                  <File name="file.tsx" size="2 Tb" />
                </div>
              )}
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
              {user.role === "intern" && data.status === "active" && (
                <div className={styles.bottomCard}>
                  {/* TODO: manage visibility */}
                  {false && (
                    <Button onClick={() => setIsResponsePopupShowed(true)}>
                      Откликнуться
                    </Button>
                  )}
                  {/* TODO: fetch status */}
                  {true && (
                    <Status
                      className={styles.bottomCardStatus}
                      status="active"
                    />
                  )}
                </div>
              )}
            </div>
            {(user.role === "curator" ||
              user.role === "staff" ||
              user.role === "mentor") && (
              <VacancyResponses
                link={`${link}/${data.id}/responses`}
                responses={data.responses.items}
                responsesCount={data.responses.count}
                responsesCountNew={data.responses.countNew}
              />
            )}
          </div>
          <div className={`${styles.card} ${styles.rightCard}`}>
            <p className={styles.cardTitle}>Статус</p>
            {/* TODO: fix statuses */}
            <Timeline statuses={statuses} activeStatus={data.status} />
            {data.rejectionReason && (
              <div className={styles.statusComment}>
                <p className={styles.statusCommentTitle}>Причина отклонения</p>
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
        </div>
      </div>

      <Popup
        title="Откликнуться на вакансию"
        isShowed={isResponsePopupShowed}
        setIsShowed={setIsResponsePopupShowed}
      >
        <Form className={styles.responsePopupForm}>
          <Form.Item
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              textarea
              placeholder="Напиши, почему ты хочешь проходить стажировку в этой компании"
              label="Сопроводительное письмо"
            />
          </Form.Item>
          {/* TODO: add action */}
          <Button type="text" style={{ alignSelf: "flex-start" }}>
            <PaperclipIcon className="icon" />
            <span>Прикрепить тестовое задание</span>
          </Button>
          <Button>Отправить отклик</Button>
        </Form>
      </Popup>
    </>
  )
}
