import { useState } from "react"
import { notification } from "antd"
import AddDepartmentModal from "components/main/modals/AddDepartment"
import Modal from "components/base/controls/Modal"
import TrashIcon from "assets/icons/trash.svg"
import PenIcon from "assets/icons/pen.svg"
import TimesIcon from "assets/icons/times.svg"
import styles from "./DepartmentCard.module.scss"

export default function DepartmentCard() {
  const [isEditModalShowed, setIsEditModalShowed] = useState(false)
  const [isDeleteModalShowed, setIsDeleteModalShowed] = useState(false)

  // TODO: send request
  const deleteDepartment = () => {
    setIsDeleteModalShowed(false)
    notification.open({
      message: "Подразделение удалено",
      closeIcon: <TimesIcon />,
    })
  }

  return (
    <>
      <div className={styles.card}>
        <p className={styles.name}>Юридический отдел</p>
        <div className={styles.controls}>
          <PenIcon
            className={styles.icon}
            onClick={() => setIsEditModalShowed(true)}
          />
          <TrashIcon
            className={`${styles.icon} ${styles.danger}`}
            onClick={() => setIsDeleteModalShowed(true)}
          />
        </div>
      </div>

      <AddDepartmentModal
        isShowed={isEditModalShowed}
        setIsShowed={setIsEditModalShowed}
        editData={{ name: "Юридический раздел" }}
      />

      <Modal
        isOpen={isDeleteModalShowed}
        title="Вы уверены, что хотите удалить подразделение"
        okText="Удалить"
        cancelText="Отмена"
        onOk={deleteDepartment}
        onCancel={() => setIsDeleteModalShowed(false)}
      />
    </>
  )
}
