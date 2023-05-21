import React, { ReactNode } from "react"
import Modal from "components/base/controls/Modal"
import Input from "components/base/controls/Input"
import { ModalProps } from "components/base/controls/Modal/Modal"

export default function PasswordModal({
  title="Изменить пароль",
  isOpen,
  className,
  okText = "Сохранить",
  cancelText = "Отмена",
  onOk,
  onCancel,
}: ModalProps) {
  return (
    // TODO: добавить валидацию старого пароля через запрос на сервер
    // Добавить валидацию двух текущих паролей
      <Modal
        className={`${className}`}
        title={title}
        isOpen={isOpen}
        onOk={onOk}
        onCancel={onCancel}
        okText={okText}
        cancelText={cancelText}
      >
        <Input label="Старый пароль" password />
        <Input label="Новый пароль" password />
        <Input label="Повторите пароль" password />
      </Modal>
  )
}
