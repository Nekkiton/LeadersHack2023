import { useEffect, useState } from "react"
import { Form } from "antd"
import { useRouter } from "next/router"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import ImageUpload from "components/base/controls/ImageUpload"
import PenIcon from "assets/icons/pen.svg"
import UploadIcon from "assets/icons/upload.svg"
import { signUpProfile } from "data"
import styles from "./FinishRegister.module.scss"

const userImg = "/images/user.svg"

export default function Profile() {
  const router = useRouter()

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

  const onFinish = async (values: any) => {
    const res = await signUpProfile(values)
    router.push(res.role)
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Регистрация</h1>
          <p className={styles.headerHint}>Шаг 2 из 2. Личные данные</p>
        </div>
        <Form className={styles.form} onFinish={onFinish} form={form}>
          <div className={`${styles.userImgContainer} ${styles.active}`}>
            <img className={styles.userImg} src={avatarUrl || userImg} />
            <div className={styles.userImgBtn}>
              <Form.Item name="photo">
                <ImageUpload setImgUrl={setAvatarUrl}>
                  <PenIcon />
                </ImageUpload>
              </Form.Item>
            </div>
          </div>
          <div className={styles.main}>
            <div className={`${styles.fields} ${styles.active}`}>
              <h3>Основная информация</h3>
              <div className={styles.mobileImgContainer}>
                <img className={styles.userImg} src={avatarUrl || userImg} />
                <Form.Item name="photo">
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
            <div className={`${styles.fields} ${styles.active}`}>
              <h3>Контактная информация</h3>
              <div className={`${styles.field} ${styles.small}`}>
                <Form.Item
                  name="phone"
                  rules={[{ required: true, message: "Заполните это поле" }]}
                >
                  <Input label="Телефон" />
                </Form.Item>
              </div>
            </div>
            <div className={styles.footer}>
              {/* TODO: controls logic */}
              <div className={styles.controls}>
                <Button disabled={!isValid} htmlType="submit">
                  Сохранить
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}
