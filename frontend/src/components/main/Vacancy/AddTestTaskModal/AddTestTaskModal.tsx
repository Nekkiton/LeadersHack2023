import React from "react"
import Modal from "components/base/controls/Modal"
import Input from "components/base/controls/Input"
import { ModalProps } from "components/base/controls/Modal"

const bodyStyle = {
  display: "flex",
  "flex-direction": "column",
  gap: "16px",
}

export default function AddTestTaskModal({
  title = "Добавьте тестовое задание",
  isOpen,
  className,
  okText = "Отправить на модерацию",
  cancelText = "Отмена",
  onOk,
  onCancel,
}: ModalProps) {
  return (
    <Modal
      className={`${className}`}
      bodyStyle={bodyStyle}
      title={title}
      isOpen={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
    >
      <Input label="Описание тестового задания" placeholder="Опишите, что нужно сделать стажеру в рамках задания" textarea />
      
    </Modal>
  )
}
