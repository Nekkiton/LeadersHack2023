import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Form, notification } from "antd"
import Link from "next/link"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import PlusIcon from "assets/icons/plus.svg"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import LinkExternalIcon from "assets/icons/link-external.svg"
import ExclamationIcon from "assets/icons/exclamation.svg"
import TimesIcon from "assets/icons/times.svg"
import styles from "./NewOrganization.module.scss"
import { addOrganization } from "data"

export default function NewOrganization() {
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

  const [staffsCount, setStaffsCount] = useState(1)
  const [departmentsCount, setDepartmentsCount] = useState(1)

  const submit = async (data: any) => {
    //data.staffs = []
    //data.departments = []

    //for (let i = 0; i < staffsCount; i++) {
    //const name = `staffs[${i}]`
    //data.staffs.push(data[name])
    //delete data[name]
    //}

    //for (let i = 0; i < departmentsCount; i++) {
    //const name = `departments[${i}]`
    //data.departments.push(data[name])
    //delete data[name]
    //}

    // TODO: fix logo
    await addOrganization({ ...data, logo: "no logo" })
    router.push("/curator/organizations")
    notification.open({
      message: "Организация добавлена",
      closeIcon: <TimesIcon />,
    })
  }

  return (
    <div className={styles.container}>
      <Link className={styles.navLink} href="/curator/organizations">
        <Button type="text">
          <ChevronLeftIcon className="icon" />
          <span>Вернуться к организациям</span>
        </Button>
      </Link>
      <h1 className={styles.title}>Добавить организацию</h1>
      <div className={styles.main}>
        <Form
          className={`${styles.card} ${styles.form}`}
          form={form}
          onFinish={submit}
        >
          <div className={styles.formBlock}>
            <h3>Основная информация</h3>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Input
                placeholder="Укажите название организации"
                label="Название"
              />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Input placeholder="Физический адрес организации" label="Адрес" />
            </Form.Item>
          </div>
          {false && (
            <div className={styles.formBlock}>
              <h3>Подразделения</h3>
              {Array.from({ length: departmentsCount }).map((_i, idx) => (
                <Form.Item
                  key={idx}
                  name={`departments[${idx}]`}
                  rules={[{ required: true, message: "Заполните это поле" }]}
                >
                  <Input label={`Подразделение ${idx + 1}`} />
                </Form.Item>
              ))}
              <Button
                className={styles.formAddBtn}
                type="text"
                onClick={() => setDepartmentsCount(departmentsCount + 1)}
              >
                <PlusIcon className="icon" />
                <span>Добавить подразделение</span>
              </Button>
            </div>
          )}
          <div className={styles.formBlock}>
            <h3>Контактная информация</h3>
            <div className={styles.formHFields}>
              <Form.Item
                name="phone"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Телефон" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Эл. почта" />
              </Form.Item>
            </div>
          </div>
          {false && (
            <div className={styles.formBlock}>
              <div className={styles.formTitleContainer}>
                <h3>Кадровые специалисты</h3>
                <p className={styles.formHint}>
                  Укажите данные сотрудника организации, который будет
                  заниматься подбором стажеров.
                  <br />
                  Если таких сотрудников несколько, укажите одного из них, а
                  остальных сможете добавить позже
                </p>
              </div>
              {Array.from({ length: staffsCount }).map((_i, idx) => (
                <Form.Item
                  key={idx}
                  name={`staffs[${idx}]`}
                  rules={[{ required: true, message: "Заполните это поле" }]}
                >
                  <Input
                    className={styles.formSmallField}
                    label={`Эл. почта специалиста ${idx + 1}`}
                  />
                </Form.Item>
              ))}
              <Button
                className={styles.formAddBtn}
                type="text"
                onClick={() => setStaffsCount(staffsCount + 1)}
              >
                <PlusIcon className="icon" />
                <span>Добавить кадрового специалиста</span>
              </Button>
            </div>
          )}
          <Button
            className={styles.formControl}
            htmlType="submit"
            disabled={!isValid}
          >
            Добавить
          </Button>
        </Form>
        <div className={`${styles.card} ${styles.hint}`}>
          <ExclamationIcon className={styles.hintIcon} />
          <p>
            После создания организации, ее кадровые специалисты смогут создавать
            вакансии для стажировок.
          </p>
          <p>
            Вы можете управлять подразделениями и кадровыми специалистами
            организации.
          </p>
          {/* TODO: add link */}
          <Button type="text">
            <span>Подробнее об управлении организациями</span>
            <LinkExternalIcon className="icon" />
          </Button>
        </div>
      </div>
    </div>
  )
}
