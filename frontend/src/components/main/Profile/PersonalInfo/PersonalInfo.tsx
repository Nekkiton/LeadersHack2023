import { useEffect } from "react"
import { Form, Spin, notification } from "antd"
import Link from "next/link"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import ImageUpload from "components/base/controls/ImageUpload"
import PenIcon from "assets/icons/pen.svg"
import UploadIcon from "assets/icons/upload.svg"
import styles from "./PersonalInfo.module.scss"
import PasswordModal from "../PasswordModal"
import { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchProfileInfo, saveProfileInfo } from "data"
import dayjs from "dayjs"

const userImg = "/images/user.svg"

export default function PersonalInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const [avatarUrl, setAvatarUrl] = useState("")

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

  const updateProfile = useMutation(saveProfileInfo, {
    onSuccess: () => {
      notification.success({
        message: "Информация обновлена",
      })
    },
  })

  if (isLoading) return <Spin />

  const { birthday, ...restValues } = data ?? {}

  return (
    <>
      <PasswordModal
        isOpen={isModalOpen}
        onCancel={toggleModal}
        onOk={toggleModal}
      />

      <Form
        className={styles.form}
        initialValues={{ ...restValues, birthday: dayjs(birthday) }}
        onFinish={(values) => {
          const { birthday, ...restValues } = values ?? {}
          updateProfile.mutate({
            ...restValues,
            birthday: birthday?.toISOString(),
          })
        }}
        form={form}
      >
        <div className={`${styles.userImgContainer}`}>
          <img
            className={styles.userImg}
            src={avatarUrl || data?.photo || userImg}
          />
          <div className={styles.userImgBtn}>
            <Form.Item name="avatar">
              <ImageUpload setImgUrl={setAvatarUrl}>
                <PenIcon />
              </ImageUpload>
            </Form.Item>
          </div>
        </div>
        <div className={styles.main}>
          <div className={`${styles.fields}`}>
            <h3>Основная информация</h3>
            <div className={styles.mobileImgContainer}>
              <img
                className={styles.userImg}
                src={avatarUrl || data?.photo || userImg}
              />
              <Form.Item name="avatar">
                <ImageUpload setImgUrl={setAvatarUrl}>
                  <Button type="text">
                    <UploadIcon className="icon" />
                    <span>Изменить фото</span>
                  </Button>
                </ImageUpload>
              </Form.Item>
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
                <Input label="Отчество" notRequired />
              </Form.Item>
            </div>
            <div className={styles.hFields}>
              <div className={styles.field}>
                <Form.Item
                  name="birthday"
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
          <div className={`${styles.fields}`}>
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
                {/* TODO: configm email logic */}
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: "Заполните это поле" }]}
                >
                  <Input disabled label="Эл. почта" />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.controls}>
              <Button
                className={styles.cancelBtn}
                type="secondary"
                onClick={() => form.resetFields()}
              >
                Отмена
              </Button>
              <Button disabled={!isValid} htmlType="submit">
                Сохранить
              </Button>
            </div>

            <Button
              className={`${styles.passwordBtn} ${styles.desktop}`}
              type="text"
              onClick={toggleModal}
            >
              <PenIcon className="icon" />
              <span>Изменить пароль</span>
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
