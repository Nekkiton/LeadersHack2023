import { useState, useEffect } from "react"
import { Form, notification } from "antd"
import Button from "components/base/controls/Button"
import Popup from "components/base/controls/Popup"
import Select from "components/base/controls/Select"
import TimesIcon from "assets/icons/times.svg"
import styles from "./RateResume.module.scss"

interface Props {
  isShowed: boolean
  setIsShowed: (val: boolean) => void
}

export default function RateResumeModal({ isShowed, setIsShowed }: Props) {
  const [isValid, setIsValid] = useState(false)
  const [form] = Form.useForm()
  const formValues = Form.useWatch([], form)

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => setIsValid(true),
      () => setIsValid(false)
    )
  }, [formValues])

  // TODO: send request, handle errors
  const submit = (data: any) => {
    console.log(data)
    setIsShowed(false)
    notification.open({
      message: "Ваша оценка сохранена",
      closeIcon: <TimesIcon />,
    })
  }

  return (
    <Popup
      isShowed={isShowed}
      setIsShowed={setIsShowed}
      title="Оцените резюме кандидата"
    >
      <Form className={styles.form} form={form} onFinish={submit}>
        <div className={styles.block}>
          <h4>Опыт работы</h4>
          <p className={styles.blockText}>
            ООО «Рога и копыта» с мая 2022 по май 2023. Ведение социальных
            сетей, придумывание рекламных креативов
            <br />
            АНО «Объединение умов» с января по май 2022. Создание контента для
            пиара мероприятий
          </p>
          <Form.Item
            name="workExp"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Select
              label="Начисление баллов"
              placeholder="Выберите из списка"
              items={[{ key: 1, value: 0 }]}
              same
            />
          </Form.Item>
        </div>
        <div className={styles.block}>
          <h4>Проектная деятельность</h4>
          <p className={styles.blockText}>...</p>
          <Form.Item
            name="projects"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Select
              label="Начисление баллов"
              placeholder="Выберите из списка"
              items={[{ key: 1, value: 0 }]}
              same
            />
          </Form.Item>
        </div>
        <div className={styles.block}>
          <h4>О себе</h4>
          <p className={styles.blockText}>
            Выводы рассмотрены в разрезе маркетинговых и финансовых предпосылок
          </p>
          <Form.Item
            name="about"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Select
              label="Начисление баллов"
              placeholder="Выберите из списка"
              items={[{ key: 1, value: 0 }]}
              same
            />
          </Form.Item>
        </div>
        <div className="controls">
          <Button
            className="control desktop"
            type="secondary"
            onClick={() => setIsShowed(false)}
          >
            Отмена
          </Button>
          <Button className="control" htmlType="submit" disabled={!isValid}>
            Оценить
          </Button>
        </div>
      </Form>
    </Popup>
  )
}
