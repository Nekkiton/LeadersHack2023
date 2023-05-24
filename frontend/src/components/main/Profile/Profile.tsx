import { useEffect } from "react"
import { Form, Spin } from "antd"
import Link from "next/link"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import Tabs from "components/base/navigation/Tabs"
import PenIcon from "assets/icons/pen.svg"
import UploadIcon from "assets/icons/upload.svg"
import styles from "./Profile.module.scss"
import PasswordModal from "./PasswordModal"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchProfileInfo } from "data/fetchProfileInfo"
import dayjs from "dayjs"

const userImg = "/images/user.svg"

const onFinish = (values: any) => {
  // TODO: add form submit logic here
  console.log("Success:", values)
}

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const [activeTab, setActiveTab] = useState("personal")

  const [isValid, setIsValid] = useState(false)
  const [form] = Form.useForm()
  const formValues = Form.useWatch([], form)

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => setIsValid(true),
      () => setIsValid(false)
    )
  }, [formValues])

  const { data, isLoading } = useQuery({
    queryKey: ["profileInfo"],
    queryFn: () => fetchProfileInfo(),
  })

  if (isLoading) return <Spin />

  const { birthdate, ...restValues } = data ?? {}

  return (
    <>
      <PasswordModal
        isOpen={isModalOpen}
        onCancel={toggleModal}
        onOk={toggleModal}
      />
      <Form
        className={styles.container}
        initialValues={{ ...restValues, birthdate: dayjs(birthdate) }}
        onFinish={onFinish}
        form={form}
      >
        <div className={`${styles.mobileHeader}`}>
          <h1 className={styles.mobileHeaderTitle}>Профиль</h1>
          {(data?.role === "candidate" || data?.role === "intern") && (
            <Tabs
              items={[
                { key: "personal", value: "Личные данные" },
                { key: "exp", value: "Опыт" },
              ]}
              value={activeTab}
              onChange={setActiveTab}
            />
          )}
        </div>
        <div className={styles.userImgContainer}>
          <img className={styles.userImg} src={userImg} />
          <div className={styles.userImgBtn}>
            <PenIcon />
          </div>
        </div>
        <div className={styles.main}>
          <div
            className={`${styles.fields} ${
              activeTab === "personal" ? styles.active : ""
            }`}
          >
            <h3>Основная информация</h3>
            <div className={styles.mobileImgContainer}>
              <img className={styles.userImg} src={userImg} />
              <Button type="text">
                <UploadIcon className="icon" />
                <span>Изменить фото</span>
              </Button>
            </div>
            <div className={styles.hFields}>
              <Form.Item
                name="surname"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Фамилия" />
              </Form.Item>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Имя" />
              </Form.Item>
              <Form.Item name="patronymic">
                <Input label="Отчество" />
              </Form.Item>
            </div>
            <div className={styles.hFields}>
              <div className={styles.field}>
                <Form.Item
                  name="birthdate"
                  rules={[{ required: true, message: "Заполните это поле" }]}
                >
                  <Input label="Дата рождения" datepicker />
                </Form.Item>
              </div>
              <div className={styles.field}>
                <Form.Item
                  name="citizenship"
                  rules={[{ required: true, message: "Заполните это поле" }]}
                >
                  <Input className={styles.field} label="Гражданство" />
                </Form.Item>
              </div>
            </div>
            <Form.Item
              name="location"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Input label="Место жительства" />
            </Form.Item>
          </div>
          <div
            className={`${styles.fields} ${
              activeTab === "personal" ? styles.active : ""
            }`}
          >
            <h3>Контактная информация</h3>
            <div className={styles.hFields}>
              <div className={styles.field}>
                <Form.Item
                  name="phone"
                  rules={[{ required: true, message: "Заполните это поле" }]}
                >
                  <Input label="Телефон" />
                </Form.Item>
              </div>
              <div className={styles.field}>
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: "Заполните это поле" }]}
                >
                  <Input label="Эл. почта" />
                </Form.Item>
              </div>
            </div>
          </div>
          <div
            className={`${styles.fields} ${
              activeTab === "exp" ? styles.active : ""
            }`}
          >
            <h3>Образование</h3>
            <div className={styles.hFields}>
              <Form.Item
                name="university"
                rules={[
                  {
                    required:
                      data?.role === "candidate" || data?.role === "intern",
                    message: "Заполните это поле",
                  },
                ]}
              >
                <Input label="Название учебного заведения (ВУЗ или СУЗ)" />
              </Form.Item>
              <Form.Item
                name="faculty"
                rules={[
                  {
                    required:
                      data?.role === "candidate" || data?.role === "intern",
                    message: "Заполните это поле",
                  },
                ]}
              >
                <Input label="Факультет" />
              </Form.Item>
              <Form.Item
                name="year"
                rules={[
                  {
                    required:
                      data?.role === "candidate" || data?.role === "intern",
                    message: "Заполните это поле",
                  },
                ]}
              >
                <Input label="Год выпуска" />
              </Form.Item>
            </div>
          </div>
          <div
            className={`${styles.fields} ${
              activeTab === "exp" ? styles.active : ""
            }`}
          >
            <h3>Опыт работы и проектной деятельности</h3>
            <Form.Item name="exp">
              <Input
                label="Опыт работы"
                textarea
                notRequired
                postscript="Напишите, когда и где вы работали и какие задачи выполняли. Это повысит ваши шансы на стажировку"
              />
            </Form.Item>
            <Form.Item name="projects">
              <Input
                label="Проектная деятельность"
                notRequired
                textarea
                postscript="Напишите, если у вас был опыт волонтерской или проектной деятельности и что именно вы делали. Это повысит ваши шансы на стажировку"
              />
            </Form.Item>
          </div>
          <div className={styles.footer}>
            <div className={styles.controls}>
              <Button className={styles.cancelBtn} type="secondary">
                Отмена
              </Button>
              <Button disabled={!isValid} htmlType="submit">
                Сохранить
              </Button>
            </div>
            <Button
              className={styles.passwordBtn}
              type="text"
              onClick={toggleModal}
            >
              Изменить пароль
            </Button>
            <Link
              className={`${styles.passwordBtn} ${styles.mobile}`}
              href="/profile/password"
            >
              <Button type="text">
                <PenIcon className="icon" />
                <span>Изменить пароль</span>
              </Button>
            </Link>
          </div>
        </div>
      </Form>
    </>
  )
}
