import { useState } from "react"
import { Form, notification } from "antd"
import Modal from "components/base/controls/Modal"
import Input from "components/base/controls/Input"
import TimesIcon from "assets/icons/times.svg"
import { ModalProps } from "components/base/controls/Modal"

const bodyStyle = {
  display: "flex",
  "flex-direction": "column",
  gap: "16px",
}

export default function PasswordModal({
  title = "Изменить пароль",
  isOpen,
  className,
  okText = "Сохранить",
  cancelText = "Отмена",
  onOk,
  onCancel,
}: ModalProps) {
  const [newPas, setNewPas] = useState("")

  // TODO: send request
  const onFinish = (data: any) => {
    console.log(data)
    onOk?.(data)
    notification.open({
      message: "Пароль изменен",
      closeIcon: <TimesIcon />,
    })
  }

  return (
    // TODO: добавить валидацию старого пароля через запрос на сервер
    // Добавить валидацию двух текущих паролей
    <Modal
      className={`${className}`}
      bodyStyle={bodyStyle}
      title={title}
      isOpen={isOpen}
      onFinish={onFinish}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      formId="reset-password-form"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Form.Item
          name="oldPassword"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input label="Старый пароль" password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input label="Новый пароль" password onChange={setNewPas} />
        </Form.Item>
        <Form.Item
          name="newPassword1"
          rules={[
            { required: true, message: "Заполните это поле" },
            {
              enum: [newPas],
              type: "enum",
              message: "Пароли не совпадают",
            },
          ]}
        >
          <Input label="Повторите пароль" password />
        </Form.Item>
      </div>
    </Modal>
  )
}
