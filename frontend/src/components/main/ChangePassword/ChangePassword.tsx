import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Form, notification } from "antd"
import Link from "next/link"
import Input from "components/base/controls/Input"
import Button from "components/base/controls/Button"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import TimesIcon from "assets/icons/times.svg"
import styles from "./ChangePassword.module.scss"

export default function ChangePassword() {
  const router = useRouter()

  const [isValid, setIsValid] = useState(false)
  const [form] = Form.useForm()
  const formValues = Form.useWatch([], form)

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => setIsValid(true),
      () => setIsValid(false)
    )
  }, [formValues])

  const saveData = (data: any) => {
    console.log(data)
    notification.open({
      message: "Пароль изменен",
      closeIcon: <TimesIcon />,
    })
    router.push("/profile")
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link className={styles.backLink} href="/profile">
          <Button type="text">
            <ChevronLeftIcon className="icon" />
            <span>Вернуться к профилю</span>
          </Button>
        </Link>
        <h1 className={styles.title}>Изменить пароль</h1>
      </div>
      <Form className={styles.main} form={form} onFinish={saveData}>
        <Form.Item
          name="old"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input label="Старый пароль" />
        </Form.Item>
        <Form.Item
          name="new1"
          rules={[
            { required: true, message: "Заполните это поле" },
            {
              enum: [formValues?.new2],
              type: "enum",
              message: "Пароли не совпадают",
            },
          ]}
        >
          <Input label="Новый пароль" />
        </Form.Item>
        <Form.Item
          name="new2"
          rules={[
            { required: true, message: "Заполните это поле" },
            {
              enum: [formValues?.new1],
              type: "enum",
              message: "Пароли не совпадают",
            },
          ]}
        >
          <Input label="Повторите пароль" />
        </Form.Item>
        <Button className={styles.submit} htmlType="submit" disabled={!isValid}>
          Сохранить
        </Button>
      </Form>
    </div>
  )
}
