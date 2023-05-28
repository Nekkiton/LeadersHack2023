import { useEffect, useState } from "react"
import { Form, notification, Spin } from "antd"
import { useRouter } from "next/router"
import Link from "next/link"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import TimesIcon from "assets/icons/times.svg"
import ExclamationIcon from "assets/icons/exclamation.svg"
import LinkExternalIcon from "assets/icons/link-external.svg"
import styles from "./InternshipManagement.module.scss"
import { fetchInternship, updateInternship, createInternship } from "data"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"

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

  const { data, isLoading } = useQuery({
    queryKey: ["internship", { id: "current" }],
    queryFn: () => fetchInternship({ id: "current" }),
  })

  const submit = async (values: any) => {
    if (data) {
      await updateInternship(values)
    } else {
      await createInternship(values)
    }
    notification.open({
      message: "Сроки стажировки настроены",
      closeIcon: <TimesIcon />,
    })
    router.push("/curator")
  }

  if (isLoading) return <Spin />

  const initialValues = !data
    ? {
        year: dayjs().year(),
      }
    : {
        ...data,
        applicationStart: dayjs(data.applicationStart),
        applicationEnd: dayjs(data.applicationEnd),
        trainingStart: dayjs(data.trainingStart),
        trainingEnd: dayjs(data.trainingEnd),
        examStart: dayjs(data.examStart),
        examEnd: dayjs(data.examEnd),
        championshipStart: dayjs(data.championshipStart),
        championshipEnd: dayjs(data.championshipEnd),
        distributionStart: dayjs(data.distributionStart),
        distributionEnd: dayjs(data.distributionStart),
        sprintOneStart: dayjs(data.sprintOneStart),
        sprintOneEnd: dayjs(data.sprintOneEnd),
        sprintTwoStart: dayjs(data.sprintTwoStart),
        sprintTwoEnd: dayjs(data.sprintTwoEnd),
        sprintThreeEnd: dayjs(data.sprintThreeStart),
        sprintTrheeEnd: dayjs(data.sprintThreeEnd),
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
        Управление сроками стажировки {initialValues.year} -{" "}
        {+initialValues.year + 1}
      </h1>
      <div className={styles.cards}>
        <Form
          className={`${styles.card} ${styles.form}`}
          form={form}
          onFinish={submit}
          initialValues={initialValues}
        >
          <div className={styles.formBlock}>
            <h4>Прием заявок</h4>
            <div className={styles.formHFields}>
              <Form.Item
                className={styles.formField}
                name="applicationStart"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата начала приема заявок" datepicker />
              </Form.Item>
              <Form.Item
                className={styles.formField}
                name="applicationEnd"
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
                name="trainingStart"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата начала обучения" datepicker />
              </Form.Item>
              <Form.Item
                className={styles.formField}
                name="trainingEnd"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата окончания обучения" datepicker />
              </Form.Item>
            </div>
            <Form.Item
              name="trainingLink"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Input label="Ссылка на обучение" />
            </Form.Item>
          </div>
          <div className={styles.formBlock}>
            <h4>Тестирование</h4>
            <div className={styles.formHFields}>
              <Form.Item
                className={styles.formField}
                name="examStart"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата начала тестирования" datepicker />
              </Form.Item>
              <Form.Item
                className={styles.formField}
                name="examEnd"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата окончания тестирования" datepicker />
              </Form.Item>
            </div>
            <Form.Item
              name="examLink"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Input label="Ссылка на тестирование" />
            </Form.Item>
          </div>
          <div className={styles.formBlock}>
            <h4>Кейс-чемпионат</h4>
            <div className={styles.formHFields}>
              <Form.Item
                className={styles.formField}
                name="championshipStart"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата начала кейс-чемпионата" datepicker />
              </Form.Item>
              <Form.Item
                className={styles.formField}
                name="championshipEnd"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата окончания кейс-чемпионата" datepicker />
              </Form.Item>
            </div>
            <Form.Item
              name="championshipLink"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Input label="Ссылка на telegram-канал, в котором будет проходить кейс-чемпионат" />
            </Form.Item>
          </div>
          <div className={styles.formBlock}>
            <h4>Распределение на стажировку</h4>
            <div className={styles.formHFields}>
              <Form.Item
                className={styles.formField}
                name="distributionStart"
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
                name="sprintOneStart"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата начала первой стажировки" datepicker />
              </Form.Item>
              <Form.Item
                className={styles.formField}
                name="sprintOneEnd"
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
                name="sprintTwoStart"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата начала второй стажировки" datepicker />
              </Form.Item>
              <Form.Item
                className={styles.formField}
                name="sprintTwoEnd"
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
                name="sprintThreeStart"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Дата начала третьей стажировки" datepicker />
              </Form.Item>
              <Form.Item
                className={styles.formField}
                name="sprintThreeEnd"
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
