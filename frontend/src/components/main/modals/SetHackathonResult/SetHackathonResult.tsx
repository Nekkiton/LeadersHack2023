import { useState, useEffect } from "react"
import { Form, notification } from "antd"
import Popup from "components/base/controls/Popup"
import Button from "components/base/controls/Button"
import Tabs from "components/base/navigation/Tabs"
import Input from "components/base/controls/Input"
import TimesIcon from "assets/icons/times.svg"
import styles from "./SetHackathonResult.module.scss"

interface Props {
  isShowed: boolean
  setIsShowed: (val: boolean) => void
}

export default function SetHackathonResultModal({
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

  // TODO: send request
  const submit = (data: any) => {
    console.log(data)
    setIsShowed(false)
    notification.open({
      message: "Результаты сохранены",
      closeIcon: <TimesIcon />,
    })
  }

  return (
    <Popup
      isShowed={isShowed}
      setIsShowed={setIsShowed}
      title={"Внесите результаты кейс-чемпионата"}
    >
      <Form
        className={styles.form}
        form={form}
        onFinish={submit}
        initialValues={{ internshipAccepted: "yes" }}
      >
        <div className={styles.tabsContainer}>
          <p>Кандидат допускается к стажировке?</p>
          <Form.Item name="internshipAccepted">
            <Tabs
              items={[
                { key: "yes", value: "Да" },
                { key: "no", value: "Нет" },
              ]}
            />
          </Form.Item>
        </div>
        <Form.Item
          name="score"
          rules={[
            {
              required: formValues?.internshipAccepted === "yes",
              message: "Заполните это поле",
            },
          ]}
          hidden={formValues?.internshipAccepted === "no"}
        >
          <Input label="Начисление баллов за кейс-чемпионат" />
        </Form.Item>
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
