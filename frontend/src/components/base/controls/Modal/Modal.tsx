import React, { ReactNode } from "react"
import { Modal as BaseModal } from "antd"
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
}

const maskStyle = {
  background: "rgba(111, 111, 111, 0.7",
  "backdrop-filter": "blur(2px)",
}

export default function Modal({
  title,
  isOpen,
  children,
  className,
  okText = "Ок",
  cancelText = "Отмена",
  onOk,
  onCancel,
}: ModalProps) {
  return (
    <>
      <BaseModal
        className={`${styles.modal} ${className}`}
        maskStyle={maskStyle}
        title={title}
        open={isOpen}
        onOk={onOk}
        onCancel={onCancel}
        okText={okText}
        cancelText={cancelText}
        closable={false}
        centered
        destroyOnClose
      >
        {children}
      </BaseModal>
    </>
  )
}
