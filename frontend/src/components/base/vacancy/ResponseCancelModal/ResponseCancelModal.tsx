import React, { ReactNode } from "react"
import { Form } from "antd"
import Modal from "components/base/controls/Modal"
import Input from "components/base/controls/Input"
import { ModalProps } from "components/base/controls/Modal"

export default function ResponseCancelModal({
  title = "Вы уверены, что хотите отклонить отклик?",
  isOpen,
  className,
  okText = "Отклонить",
  cancelText = "Отмена",
  onOk,
  onCancel,
}: ModalProps) {
  return (
    <>
      <Modal
        className={`${className}`}
        title={title}
        isOpen={isOpen}
        onFinish={onOk}
        onCancel={onCancel}
        okText={okText}
        cancelText={cancelText}
        formId="response-cancel-modal"
      >
        <Form.Item
          name="message"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input label="Причина отклонения" textarea />
        </Form.Item>
      </Modal>
    </>
  )
}
