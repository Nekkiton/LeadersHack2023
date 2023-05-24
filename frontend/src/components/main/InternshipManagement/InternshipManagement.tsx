import { useEffect, useState } from "react"
import { Form, notification } from "antd"
import { useRouter } from "next/router"
import Link from "next/link"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import TimesIcon from "assets/icons/times.svg"
import ExclamationIcon from "assets/icons/exclamation.svg"
import LinkExternalIcon from "assets/icons/link-external.svg"
import styles from "./InternshipManagement.module.scss"

export default function InternshipManagement() {
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

  const saveInternship = () => {
    notification.open({
      message: "Сроки стажировки настроены",
      closeIcon: <TimesIcon />,
    })
    router.push("/curator")
  }

  return (
    <div className={styles.container}>
      <Link className={styles.backLink} href="/curator">
        <Button type="text">
          <ChevronLeftIcon className="icon" />
          <span>Вернуться на главную</span>
        </Button>
      </Link>
      <h1 className={styles.title}>
        Управление сроками стажировки 2023 - 2024
      </h1>
      <div className={styles.cards}>
        <Form
          className={`${styles.card} ${styles.form}`}
          form={form}
          onFinish={saveInternship}
        >
          <div className={styles.formBlock}>
            <h4>Прием заявок</h4>
            <div className={styles.formHFields}>
              <Form.Item
                className={styles.formField}
                name="a"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата начала приема заявок" datepicker />
              </Form.Item>
              <Form.Item
                className={styles.formField}
                name="b"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата окончания приема заявок" datepicker />
              </Form.Item>
            </div>
          </div>
          <div className={styles.formBlock}>
            <h4>Обучение</h4>
            <div className={styles.formHFields}>
              <Form.Item
                className={styles.formField}
                name="c"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата начала обучения" datepicker />
              </Form.Item>
              <Form.Item
                className={styles.formField}
                name="d"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата окончания обучения" datepicker />
              </Form.Item>
            </div>
          </div>
          <div className={styles.formBlock}>
            <h4>Тестирование</h4>
            <div className={styles.formHFields}>
              <Form.Item
                className={styles.formField}
                name="e"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата начала тестирования" datepicker />
              </Form.Item>
              <Form.Item
                className={styles.formField}
                name="f"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата окончания тестирования" datepicker />
              </Form.Item>
            </div>
          </div>
          <div className={styles.formBlock}>
            <h4>Кейс-чемпионат</h4>
            <div className={styles.formHFields}>
              <Form.Item
                className={styles.formField}
                name="g"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата начала кейс-чемпионата" datepicker />
              </Form.Item>
              <Form.Item
                className={styles.formField}
                name="h"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата окончания кейс-чемпионата" datepicker />
              </Form.Item>
            </div>
          </div>
          <div className={styles.formBlock}>
            <h4>Распределение на стажировку</h4>
            <div className={styles.formHFields}>
              <Form.Item
                className={styles.formField}
                name="i"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата начала распределения" datepicker />
              </Form.Item>
            </div>
          </div>
          <div className={styles.formBlock}>
            <h4>Стажировка. Спринт 1</h4>
            <div className={styles.formHFields}>
              <Form.Item
                className={styles.formField}
                name="j"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата начала первой стажировки" datepicker />
              </Form.Item>
              <Form.Item
                className={styles.formField}
                name="k"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата окончания первой стажировки" datepicker />
              </Form.Item>
            </div>
          </div>
          <div className={styles.formBlock}>
            <h4>Стажировка. Спринт 2</h4>
            <div className={styles.formHFields}>
              <Form.Item
                className={styles.formField}
                name="l"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата начала второй стажировки" datepicker />
              </Form.Item>
              <Form.Item
                className={styles.formField}
                name="m"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата окончания второй стажировки" datepicker />
              </Form.Item>
            </div>
          </div>
          <div className={styles.formBlock}>
            <h4>Стажировки. Спринт 3</h4>
            <div className={styles.formHFields}>
              <Form.Item
                className={styles.formField}
                name="n"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата начала третьей стажировки" datepicker />
              </Form.Item>
              <Form.Item
                className={styles.formField}
                name="q"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата окончания третьей стажировки" datepicker />
              </Form.Item>
            </div>
          </div>
          <Button
            className={styles.formSubmitBtn}
            htmlType="submit"
            disabled={!isValid}
          >
            Сохранить
          </Button>
        </Form>
        <div className={`${styles.card} ${styles.hint}`}>
          <ExclamationIcon className={styles.hintIcon} />
          <p className={styles.hintText}>
            Вы можете редактировать сроки этапов стажировки, которые еще не
            прошли.
          </p>
          <p className={styles.hintText}>
            При изменении сроков сделайте рассылку участникам стажировки, чтобы
            они были в курсе изменений.
          </p>
          {/* TODO: add link */}
          <Button type="text">
            <span>Подробнее об управлении сроками стажировки</span>
            <LinkExternalIcon className="icon" />
          </Button>
        </div>
      </div>
    </div>
  )
}
