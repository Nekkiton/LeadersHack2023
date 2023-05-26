import { useState, useEffect } from "react"
import { Form, notification } from "antd"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import Checkbox from "components/base/controls/Checkbox"
import Popup from "components/base/controls/Popup"
import TimesIcon from "assets/icons/times.svg"
import styles from "./InternshipReminder.module.scss"

interface Props {
  isShowed: boolean
  setIsShowed: (val: boolean) => void
}

export default function InternshipReminderModal({
  isShowed,
  setIsShowed,
}: Props) {
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
      message: "Напоминание установлено",
      closeIcon: <TimesIcon />,
    })
  }

  return (
    <Popup
      isShowed={isShowed}
      setIsShowed={setIsShowed}
      title="Напоминание о стажировке"
    >
      <Form className={styles.form} form={form} onFinish={submit}>
        <p className={styles.formHint}>
          Узнай первым о старте приема заявок на стажировку в Правительстве
          Москвы в 2024 году
        </p>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input label="Эл. почта" />
        </Form.Item>
        <Form.Item
          name="rules"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Checkbox
            small
            items={[
              {
                value: "yes",
                content: (
                  <div>
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
        <Button className="control" htmlType="submit" disabled={!isValid}>
          Отправить
        </Button>
      </Form>
    </Popup>
  )
}
