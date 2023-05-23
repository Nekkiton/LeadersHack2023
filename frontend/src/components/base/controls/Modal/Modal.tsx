import React, { ReactNode, useState, useEffect } from "react"
import { Modal as BaseModal, Form } from "antd"
import { Store } from "antd/es/form/interface"
import styles from "./Modal.module.scss"

export interface ModalProps {
  title?: string
  isOpen: boolean
  onOk?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void
  okText?: string
  cancelText?: string
  children?: ReactNode
  className?: string
  bodyStyle?: React.CSSProperties
  formId?: string
  initialValues?: Store
  onFinish?: (values: any) => void
}

const maskStyle = {
  background: "rgba(111, 111, 111, 0.7",
  backdropFilter: "blur(2px)",
}

export default function Modal({
  title,
  isOpen,
  children,
  className,
  bodyStyle,
  okText = "Ок",
  cancelText = "Отмена",
  onOk,
  onCancel,
  formId,
  initialValues,
  onFinish,
}: ModalProps) {
  const [isValid, setIsValid] = useState(false)
  const [form] = Form.useForm()
  const formValues = Form.useWatch([], form)

  const validate = () => {
    form.validateFields({ validateOnly: true }).then(
      () => setIsValid(true),
      () => setIsValid(false)
    )
  }

  useEffect(() => validate(), [formValues])

  useEffect(() => {
    if (isOpen) {
      setTimeout(validate, 100)
    }
  }, [isOpen])

  return (
    <>
      <BaseModal
        className={`${styles.modal} ${className}`}
        maskStyle={maskStyle}
        bodyStyle={bodyStyle}
        title={title}
        open={isOpen}
        onOk={!formId ? onOk : undefined}
        onCancel={onCancel}
        okText={okText}
        cancelText={cancelText}
        closable={false}
        centered
        destroyOnClose
        okButtonProps={
          formId
            ? {
                htmlType: "submit",
                form: formId,
                disabled: !isValid,
              }
            : {}
        }
      >
        <Form
          onFinish={onFinish}
          id={formId}
          initialValues={initialValues}
          form={form}
          preserve={false}
        >
          {children}
        </Form>
      </BaseModal>
    </>
  )
}
