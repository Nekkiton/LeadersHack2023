import { useEffect, useState } from "react"
import { Form, notification } from "antd"
import { useRouter } from "next/router"
import Link from "next/link"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import ExclamationIcon from "assets/icons/exclamation.svg"
import LinkExternalIcon from "assets/icons/link-external.svg"
import TimesIcon from "assets/icons/times.svg"
import styles from "./NewMentor.module.scss"

export default function NewVacancy() {
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

  // TODO: create mentor, handle errors
  const saveMentor = (data: any) => {
    console.log(data)
    notification.open({
      message: "Ссылка на регистрацию отправлена наставнику",
      closeIcon: <TimesIcon />,
    })
    router.push("/staff/mentors")
  }

  return (
    <div className={styles.container}>
      <Link href="/staff/mentors">
        <Button className={styles.navBtn} type="text">
          <ChevronLeftIcon className="icon" />
          <span>Вернуться к наставникам</span>
        </Button>
      </Link>
      <h1 className={styles.title}>Добавить наставника</h1>
      <div className={styles.content}>
        <Form className={styles.form} form={form} onFinish={saveMentor}>
          <div className={styles.formHFields}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Input label="Имя" />
            </Form.Item>
            <Form.Item
              name="patronymic"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Input label="Отчество" />
            </Form.Item>
            <Form.Item
              name="surname"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Input label="Фамилия" />
            </Form.Item>
          </div>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              label="Эл. почта"
              postscript="На эту почту наставнику придет ссылка для регистрации"
              className={styles.formField}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" disabled={!isValid}>
              Добавить
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.hint}>
          <ExclamationIcon className={styles.hintIcon} />
          <p className={styles.hintText}>
            После добавления наставника ему придет письмо со ссылкой для
            регистрации на платформе.
          </p>
          <p className={styles.hintText}>
            Обратите внимание: для того, чтобы закреплять стажеров
            за наставником, ему необходимо пройти обучение в Школе наставников
          </p>
          {/* TODO: add link */}
          <Button type="text">
            <span>Подробнее о добавлении наставников</span>
            <LinkExternalIcon className="icon" />
          </Button>
        </div>
      </div>
    </div>
  )
}
