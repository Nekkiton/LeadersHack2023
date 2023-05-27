import React from "react"
import { Form } from "antd"
import Modal from "components/base/controls/Modal"
import FileUpload from "components/base/controls/FileUpload"
import Input from "components/base/controls/Input"
import { ModalProps } from "components/base/controls/Modal"
import styles from "./AddTestTaskModal.module.scss"

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
  onCancel,
  onFinish,
  initialValues,
}: ModalProps) {
  return (
    <Modal
      className={`${className}`}
      bodyStyle={bodyStyle}
      title={title}
      isOpen={isOpen}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      formId="add-test-task-modal"
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <div className={styles.form}>
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Заполните эо поле" }]}
        >
          <Input
            label="Описание тестового задания"
            placeholder="Опишите, что нужно сделать стажеру в рамках задания"
            textarea
          />
        </Form.Item>
        <Form.Item name="files">
          <FileUpload label="Файлы с заданием" notRequired />
        </Form.Item>
      </div>
    </Modal>
  )
}
