import React, { ReactNode } from "react"
import Modal from "components/base/controls/Modal"
import Input from "components/base/controls/Input"
import { ModalProps } from "components/base/controls/Modal/Modal"

export default function ResponseCancelModal({
  title="Вы уверены, что хотите отклонить отклик?",
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
        onOk={onOk}
        onCancel={onCancel}
        okText={okText}
        cancelText={cancelText}
      >
        <Input label="Причина отклонения" textarea />
      </Modal>
    </>
  )
}
