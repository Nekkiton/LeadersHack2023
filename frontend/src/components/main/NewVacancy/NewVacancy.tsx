import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Form } from "antd"
import Link from "next/link"
import Button from "components/base/controls/Button"
import Select from "components/base/controls/Select"
import Modal from "components/base/controls/Modal"
import Input from "components/base/controls/Input"
import styles from "./NewVacancy.module.scss"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import ExclamationIcon from "assets/icons/exclamation.svg"
import LinkExternalIcon from "assets/icons/link-external.svg"
import TimesIcon from "assets/icons/times.svg"
import { notification } from "antd"

interface Props {
  editId: string
}

const userImg = "/images/user.svg"

export default function NewVacancy({ editId }: Props) {
  const router = useRouter()

  const [isValid, setIsValid] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const formValues = Form.useWatch([], form)

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => setIsValid(true),
      () => setIsValid(false)
    )
  }, [formValues])

  // TODO: fetch all of these
  const departments = [
    {
      name: "department 1",
      id: "1",
    },
  ]
  const dates = [
    {
      start: "today",
      end: "tomorrow",
      id: "2",
    },
  ]
  const mentors = [
    {
      id: "1",
      name: "Nikita",
      image: null,
    },
  ]

  const [initialData, setInitialData] = useState<{} | null>(null)

  useEffect(() => {
    // TODO: fetch vacancy, handle 404
    if (editId || router.query.copy) {
      setInitialData({
        name: "name",
        description: "description",
        division: "1",
        dates: "2",
        mentor: "1",
      })
    }
  }, [editId, router.query.copy])

  if ((router.query.copy || editId) && !initialData) {
    return <div>Загрузка...</div>
  }

  // TODO: create or edit vacancy, handle errors
  const saveVacancy = (data: any) => {
    console.log(data)
    notification.open({
      message: editId ? "Вакансия изменена" : "Вакансия создана",
      closeIcon: <TimesIcon />,
    })
    router.push("/staff/vacancies")
  }

  // TODO: delete vacancy, handle errors
  const deleteVacancy = () => {
    toggleModal()
    notification.open({
      message: "Вакансия удалена",
      closeIcon: <TimesIcon />,
    })
    router.push("/staff/vacancies")
  }

  return (
    <div className={styles.container}>
      <Modal
        isOpen={isModalOpen}
        title="Вы уверены, что хотите удалить вакансию?"
        onCancel={toggleModal}
        onOk={deleteVacancy}
        okText="Удалить"
      />
      <Link href="/staff/vacancies">
        <Button className={styles.navBtn} type="text">
          <ChevronLeftIcon className="icon" />
          <span>Вернуться к вакансиям</span>
        </Button>
      </Link>
      <h1 className={styles.title}>Создать вакансию</h1>
      <div className={styles.content}>
        <Form
          className={styles.form}
          form={form}
          initialValues={initialData || {}}
          onFinish={saveVacancy}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input placeholder="Укажите название должности" label="Название" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              placeholder="Опишите задачи, которые нужно будет выполнять стажеру"
              label="Описание"
              textarea
            />
          </Form.Item>
          <Form.Item
            name="division"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Select
              placeholder="Выберите из списка"
              label="Подразделение"
              items={departments.map((i) => ({
                key: i.id,
                value: i.name,
              }))}
              same
            />
          </Form.Item>
          <div className={styles.formHFields}>
            <Form.Item
              name="dates"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Select
                placeholder="Выберите из списка"
                label="Даты стажировки"
                items={dates.map((i) => ({
                  key: i.id,
                  value: `${i.start} - ${i.end}`,
                }))}
                same
              />
            </Form.Item>
            <Form.Item
              name="mentor"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Select
                placeholder="Выберите из списка"
                label="Наставник"
                items={mentors.map((i) => ({
                  key: i.id,
                  value: (
                    <div className={styles.formMentor}>
                      <img
                        className={styles.formMentorImg}
                        src={i.image || userImg}
                      />
                      <p className={styles.formMentorName}>{i.name}</p>
                    </div>
                  ),
                  selectedValue: i.name,
                }))}
                same
              />
            </Form.Item>
          </div>
          <div className={styles.formControls}>
            <Form.Item>
              <Button htmlType="submit" disabled={!isValid}>
                {editId ? "Сохранить" : "Создать"}
              </Button>
            </Form.Item>
            {editId && (
              <Button
                className={styles.formDeleteBtn}
                type="text"
                onClick={toggleModal}
              >
                <TimesIcon className="icon" />
                <span>Удалить вакансию</span>
              </Button>
            )}
          </div>
        </Form>
        <div className={styles.hint}>
          <ExclamationIcon className={styles.hintIcon} />
          <p className={styles.hintText}>
            После создания вакансия появится у выбранного наставника в личном
            кабинете. Он должен будет добавить тестовое задание. Если вакансия
            не подразумевает тестового задания, наставник может пропустить этот
            шаг.
          </p>
          <p className={styles.hintText}>
            Актуальный статус вакансии вы сможете увидеть в личном кабинете
          </p>
          <Button type="text">
            <span>Подробнее о создании вакансий</span>
            <LinkExternalIcon className="icon" />
          </Button>
        </div>
      </div>
    </div>
  )
}
