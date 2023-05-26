import { useState, useEffect } from "react"
import { Form, notification, Rate } from "antd"
import Popup from "components/base/controls/Popup"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import TimesIcon from "assets/icons/times.svg"
import StarIcon from "assets/icons/star.svg"
import styles from "./MakeInternshipFeedback.module.scss"

interface Props {
  isShowed: boolean
  setIsShowed: (val: boolean) => void
}

const userImg = "/images/user.svg"

export default function MakeInternshipFeedbackModal({
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
      message: "Спасибо! Отзыв отправлен",
      closeIcon: <TimesIcon />,
    })
  }

  return (
    <Popup
      isShowed={isShowed}
      setIsShowed={setIsShowed}
      title="Оцени стажировку"
    >
      <Form className={styles.form} form={form} onFinish={submit}>
        <div className={styles.block}>
          <h4>Оцени своего наставника</h4>
          <div className={styles.rate}>
            <p>Оценка</p>
            <Form.Item
              name="mentorRate"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Rate character={<StarIcon className={styles.rateIcon} />} />
            </Form.Item>
          </div>
          <Form.Item
            name="mentorComment"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              textarea
              placeholder="Что вам понравилось и не понравилось"
              label="Комментарий"
            />
          </Form.Item>
        </div>
        <div className={styles.block}>
          <h4>Оцени организацию, в которой ты стажировался</h4>
          <div className={styles.rate}>
            <p>Оценка</p>
            <Form.Item
              name="organizationRate"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Rate character={<StarIcon className={styles.rateIcon} />} />
            </Form.Item>
          </div>
          <Form.Item
            name="organizationComment"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              textarea
              placeholder="Что вам понравилось и не понравилось"
              label="Комментарий"
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
