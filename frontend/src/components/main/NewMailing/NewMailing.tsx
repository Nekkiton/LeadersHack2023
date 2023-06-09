import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Form, Spin, notification } from "antd"
import Link from "next/link"
import Button from "components/base/controls/Button"
import Select from "components/base/controls/Select"
import Modal from "components/base/controls/Modal"
import Input from "components/base/controls/Input"
import Checkbox from "components/base/controls/Checkbox"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import ExclamationIcon from "assets/icons/exclamation.svg"
import LinkExternalIcon from "assets/icons/link-external.svg"
import TrashIcon from "assets/icons/trash.svg"
import TimesIcon from "assets/icons/times.svg"
import styles from "./NewMailing.module.scss"

interface Props {
  editId?: string
}

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

  const [initialData, setInitialData] = useState<{} | null>(null)

  useEffect(() => {
    // TODO: fetch mail, handle errors
    if (editId || router.query.copy) {
      setInitialData({
        theme: "ad",
        text: "asd",
      })
    }
  }, [editId, router.query.copy])

  if ((router.query.copy || editId) && !initialData) {
    return <Spin />
  }

  // TODO: create or edit mailint, handle errors
  const saveMailing = (data: any) => {
    console.log(data)
    notification.open({
      message: editId ? "Рассылка изменена" : "Рассылка создана",
      closeIcon: <TimesIcon />,
    })
    router.push("/curator/mailing")
  }

  // TODO: delete mailing, handle errors
  const deleteMailing = () => {
    toggleModal()
    notification.open({
      message: "Рассылка удалена",
      closeIcon: <TimesIcon />,
    })
    router.push("/curator/mailing")
  }

  return (
    <div className={styles.container}>
      <Modal
        isOpen={isModalOpen}
        title="Вы уверены, что хотите удалить рассылку?"
        onCancel={toggleModal}
        onOk={deleteMailing}
        okText="Удалить"
      />
      <Link className={styles.navBtn} href="/curator/mailing">
        <Button type="text">
          <ChevronLeftIcon className="icon" />
          <span>Вернуться к рассылкам</span>
        </Button>
      </Link>
      <h1 className={styles.title}>
        {editId ? "Редактировать рассылку" : "Создать рассылку"}
      </h1>
      <div className={styles.content}>
        <Form
          className={styles.form}
          form={form}
          initialValues={initialData || {}}
          onFinish={saveMailing}
        >
          <Form.Item
            name="theme"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input label="Тема" />
          </Form.Item>
          <Form.Item
            name="text"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input label="Текст" textarea />
          </Form.Item>

          <Form.Item
            name="type"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Checkbox
              className={styles.formCheckboxes}
              items={[
                { value: "email", content: "E-mail" },
                { value: "push", content: "Push (уведомления на сайте)" },
              ]}
            />
          </Form.Item>
          <div className={styles.formHFields}>
            <div className={styles.formHLongField}>
              <Form.Item
                name="recipients"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Select
                  placeholder="Выберите из списка"
                  label="Получатели"
                  items={[
                    { key: 1, value: "Наставники" },
                    { key: 2, value: "Кураторы" },
                  ]}
                  multiple
                />
              </Form.Item>
            </div>
            <Form.Item
              name="date"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Input label="Дата отправки" datepicker />
            </Form.Item>
            <Form.Item
              name="time"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Input label="Время отправки" timepicker />
            </Form.Item>
          </div>
          <div className={styles.formControls}>
            <Form.Item>
              <Button htmlType="submit" disabled={!isValid}>
                Сохранить
              </Button>
            </Form.Item>
            {editId && (
              <Button
                className={styles.formDeleteBtn}
                type="text"
                onClick={toggleModal}
              >
                <TrashIcon className="icon" />
                <span>Удалить рассылку</span>
              </Button>
            )}
          </div>
        </Form>
        <div className={styles.hint}>
          <ExclamationIcon className={styles.hintIcon} />
          <p className={styles.hintText}>
            Сообщение будет отправлено автоматически в указанное время от имени
            карьерного центра стажеров Правительства Москвы
          </p>
          <Button type="text">
            <span>Подробнее о рассылках</span>
            <LinkExternalIcon className="icon" />
          </Button>
        </div>
      </div>
    </div>
  )
}
