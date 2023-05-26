import { useState, useEffect } from "react"
import { Form, notification } from "antd"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import Popup from "components/base/controls/Popup"
import TimesIcon from "assets/icons/times.svg"
import styles from "./CancelVacancy.module.scss"

interface Props {
  isShowed: boolean
  setIsShowed: (val: boolean) => void
}

export default function CancelVacancyModal({ isShowed, setIsShowed }: Props) {
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
      message: "Вакансия отклонена",
      closeIcon: <TimesIcon />,
    })
  }

  return (
    <Popup
      isShowed={isShowed}
      setIsShowed={setIsShowed}
      title="Вы уверены, что хотите отклонить вакансию?"
    >
      <Form className={styles.form} form={form} onFinish={submit}>
        <Form.Item
          name="message"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input
            textarea
            label="Причина отклонения"
            placeholder="Напишите, что нужно исправить в вакансии, чтобы она была согласована"
          />
        </Form.Item>
        <div className="controls">
          <Button
            className="control desktopp"
            type="secondary"
            onClick={() => setIsShowed(false)}
          >
            Отмена
          </Button>
          <Button className="control" htmlType="submit" disabled={!isValid}>
            Отклонить
          </Button>
        </div>
      </Form>
    </Popup>
  )
}
