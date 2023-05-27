import { useState, useEffect } from "react"
import { Form, notification } from "antd"
import Popup from "components/base/controls/Popup"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import TimesIcon from "assets/icons/times.svg"
import styles from "./AddDepartment.module.scss"

interface Props {
  isShowed: boolean
  setIsShowed: (val: boolean) => void
  editData?: { [key: string]: any }
}

export default function AddDepartmentModal({
  isShowed,
  setIsShowed,
  editData,
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
    // edit or create

    console.log(data)
    setIsShowed(false)
    notification.open({
      message: editData ? "Подразделение изменено" : "Подразделение добавлено",
      closeIcon: <TimesIcon />,
    })
  }

  return (
    <Popup
      isShowed={isShowed}
      setIsShowed={setIsShowed}
      title={
        editData ? "Редактирование подразделения" : "Добавление подразделение"
      }
    >
      <Form
        className={styles.form}
        form={form}
        onFinish={submit}
        initialValues={editData}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input label="Название" />
        </Form.Item>
        <div className="controls">
          <Button
            className="control desktop"
            onClick={() => setIsShowed(false)}
            type="secondary"
          >
            Отмена
          </Button>
          <Button className="control" htmlType="submit" disabled={!isValid}>
            {editData ? "Сохранить" : "Добавить"}
          </Button>
        </div>
      </Form>
    </Popup>
  )
}
