import { useState, useEffect } from "react"
import { Form, Rate, notification } from "antd"
import Popup from "components/base/controls/Popup"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import StarIcon from "assets/icons/star.svg"
import TimesIcon from "assets/icons/times.svg"
import styles from "./RateUser.module.scss"
import { Role } from "models/Role"

interface Props {
  isShowed: boolean
  setIsShowed: (val: boolean) => void
  role: Role
}

export default function RateUserModal({ isShowed, setIsShowed, role }: Props) {
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
    setIsShowed(false)
    notification.open({
      message: "Ваша оценка отправлена",
      closeIcon: <TimesIcon />,
    })
  }

  return (
    <Popup
      isShowed={isShowed}
      setIsShowed={setIsShowed}
      title={role === Role.INTERN && "Оцените работу стажера"}
    >
      <Form className={styles.form} form={form} onFinish={submit}>
        <div className={styles.rating}>
          <p>Оценка</p>
          <Form.Item
            name="rate"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Rate character={<StarIcon className={styles.ratingIcon} />} />
          </Form.Item>
        </div>
        <Form.Item
          name="message"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input label="Комментарий" textarea />
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
