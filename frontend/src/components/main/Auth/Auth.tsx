import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Form, notification } from "antd"
import Link from "next/link"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import Checkbox from "components/base/controls/Checkbox"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import MailSentIcon from "assets/icons/mail-sent.svg"
import TimesIcon from "assets/icons/times.svg"
import styles from "./Auth.module.scss"
import { signIn, signUp } from "data"
import { AxiosError } from "axios"
import { Role } from "models/Role"

interface Props {
  type: "login" | "register" | "resetPassword" | "setPassword"
}

export default function Auth({ type: pageType }: Props) {
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

  const [isResetPasswordFinished, setIsResetPasswordFinished] = useState(false)

  /* TODO: send requests */
  const submit = async (data: any) => {
    if (pageType === "login") {
      try {
        const res = await signIn(data)
        if (res.role === Role.STAFF) {
          router.push("/staff")
        } else if (res.role === Role.MENTOR) {
          router.push("/mentor")
        } else if (res.role === Role.CURATOR) {
          router.push("/curator")
        } else if (res.role === Role.INTERN || res.role === Role.CANDIDATE) {
          router.push("/intern")
        } else if (res.role === Role.NOBODY) {
          router.push("/register/finish")
        } else {
          router.push("/")
        }
      } catch (e) {
        console.log(e)
        if ((e as AxiosError).response?.status === 401) {
          notification.open({
            message: "Логин или пароль неправильны",
            closeIcon: <TimesIcon />,
          })
        }
      }
    } else if (pageType === "register") {
      await signUp(data)
      router.push("/register/finish")
    } else if (pageType === "resetPassword") {
      setIsResetPasswordFinished(true)
    } else if (pageType === "setPassword") {
      router.push("/profile")
      notification.open({
        message: "Пароль сохранен",
        closeIcon: <TimesIcon />,
      })
    }
  }

  return (
    <div className={styles.container}>
      <img className={styles.image} src="/images/your-town.svg" />
      {isResetPasswordFinished ? (
        <div className={`${styles.card} ${styles.message}`}>
          <MailSentIcon className={styles.messageIcon} />
          <div className={styles.messageText}>
            <h3>Ссылка на восстановление пароля отправлена</h3>
            <p className={styles.messageTextDescription}>
              Перейдите по ней, чтобы установить новый пароль для входа в личный
              кабинет
            </p>
          </div>
        </div>
      ) : (
        <Form
          className={`${styles.card} ${styles.form}`}
          form={form}
          onFinish={submit}
        >
          <div className={styles.formHeader}>
            <div className={styles.formHeaderMain}>
              <h1 className={styles.formTitle}>
                {pageType === "login" && "Вход"}
                {pageType === "register" && "Регистрация"}
                {pageType === "resetPassword" && "Восстановление пароля"}
                {pageType === "setPassword" && "Установка нового пароля"}
              </h1>
              {pageType === "login" && (
                <Link href="/register">
                  <Button type="text">Регистрация</Button>
                </Link>
              )}
              {pageType === "register" && (
                <Link href="/login">
                  <Button type="text">Вход</Button>
                </Link>
              )}
            </div>
            {pageType === "register" && (
              <p className={styles.formHeaderHint}>
                Шаг 1 из 2. Создание аккаунта
              </p>
            )}
          </div>
          {pageType === "resetPassword" && (
            <Link className={styles.formCenterLink} href="/login">
              <Button type="text">
                <ChevronLeftIcon className="icon" />
                <span>Вернуться ко входу</span>
              </Button>
            </Link>
          )}
          <div className={styles.formFields}>
            {(pageType === "login" ||
              pageType === "resetPassword" ||
              pageType == "register") && (
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Эл. почта" />
              </Form.Item>
            )}
            {(pageType === "login" ||
              pageType === "register" ||
              pageType === "setPassword") && (
              <div className={styles.formPasswordContainer}>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Заполните это поле" }]}
                >
                  <Input
                    password
                    label={
                      pageType === "setPassword" ? "Новый пароль" : "Пароль"
                    }
                  />
                </Form.Item>
                {pageType === "login" && (
                  <Link
                    href="/login/password/reset"
                    className={styles.formForgotPassword}
                  >
                    <Button type="text">Не помню пароль</Button>
                  </Link>
                )}
              </div>
            )}
            {(pageType === "register" || pageType === "setPassword") && (
              <Form.Item
                name="password2"
                rules={[
                  {
                    required: true,
                    message: "Заполните это поле",
                  },
                  {
                    enum: [formValues?.password],
                    type: "enum",
                    message: "Пароли не совпадают",
                  },
                ]}
              >
                <Input password label="Повторите пароль" />
              </Form.Item>
            )}
          </div>
          <Form.Item
            name="rules"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            {/* TODO: add link */}
            <Checkbox
              items={[
                {
                  value: "yes",
                  content: (
                    <div className={styles.formCheckbox}>
                      Даю согласие на{" "}
                      <span className={styles.formLink}>
                        обработку персональных данных
                      </span>
                    </div>
                  ),
                },
              ]}
            />
          </Form.Item>
          <Button htmlType="submit" disabled={!isValid}>
            {pageType === "login" && "Войти"}
            {pageType === "resetPassword" && "Восстановить пароль"}
            {pageType === "setPassword" && "Сохранить"}
            {pageType === "register" && "Зарегистрироваться"}
          </Button>
          {/* TODO: add link */}
          {pageType === "register" && (
            <div className={styles.formHint}>
              Если ты наставник или кадровый специалист организации
              Правительства Москвы, для регистрации{" "}
              <span className={styles.formLink}>
                обратись к куратору карьерного центра
              </span>
            </div>
          )}
        </Form>
      )}
    </div>
  )
}
