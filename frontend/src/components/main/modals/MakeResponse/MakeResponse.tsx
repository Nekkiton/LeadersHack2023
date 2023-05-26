import { useState, useEffect } from "react"
import { Form, notification } from "antd"
import Popup from "components/base/controls/Popup"
import Input from "components/base/controls/Input"
import Button from "components/base/controls/Button"
import PaperclipIcon from "assets/icons/paperclip.svg"
import TimesIcon from "assets/icons/times.svg"
import styles from "./MakeResponse.module.scss"

interface Props {
  isShowed: boolean
  setIsShowed: (val: boolean) => void
}

export default function MakeResponse({ isShowed, setIsShowed }: Props) {
  const [isValid, setIsValid] = useState(false)
  const [form] = Form.useForm()
  const formValues = Form.useWatch([], form)

  useEffect(() => {
    console.log("f")
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
      message: "Отклик на вакансию отправлен",
      closeIcon: <TimesIcon />,
    })
  }

  return (
    <Popup
      title="Откликнуться на вакансию"
      isShowed={isShowed}
      setIsShowed={setIsShowed}
    >
      <Form className={styles.form} form={form} onFinish={submit}>
        <Form.Item
          name="message"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input
            textarea
            placeholder="Напиши, почему ты хочешь проходить стажировку в этой компании"
            label="Сопроводительное письмо"
          />
        </Form.Item>
        {/* TODO: add action */}
        <Button className={styles.formTaskBtn} type="text">
          <PaperclipIcon className="icon" />
          <span>Прикрепить тестовое задание</span>
        </Button>
        <div className="controls">
          <Button
            className="control desktop"
            type="secondary"
            onClick={() => setIsShowed(false)}
          >
            Отмена
          </Button>
          <Button className="control" htmlType="submit" disabled={!isValid}>
            Отправить отклик
          </Button>
        </div>
      </Form>
    </Popup>
  )
}
