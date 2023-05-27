import { DragEvent } from "react"
import { Upload } from "antd"
import File from "components/base/controls/File/File"
import TimesIcon from "assets/icons/times.svg"
import BoxIcon from "assets/icons/box.svg"
import styles from "./FileUpload.module.scss"

interface Props {
  value?: any
  onChange?: (val: any) => void
  notRequired?: boolean
  label?: string
}

export default function FileUpload({
  value,
  onChange,
  notRequired,
  label,
}: Props) {
  return (
    <div className={styles.container}>
      {label && (
        <p className={styles.label}>
          {label}
          {notRequired && (
            <span className={styles.labelHint}> — необязательно</span>
          )}
        </p>
      )}
      <Upload.Dragger
        className={styles.dropAreaContainer}
        accept=".doc,.docx,.pdf"
        multiple
        itemRender={(_node, file, fileList_, actions) => (
          <File name={file.name} size={file.size} onRemove={actions.remove} />
        )}
        onChange={onChange}
      >
        <div className={styles.dropArea}>
          <BoxIcon className={styles.dropAreaIcon} />
          <p className={styles.dropAreaTitle}>
            Загрузите файл или перетащите его в эту область
          </p>
          <p className={styles.dropAreaHint}>
            Не более 5 Мб в формате pdf или docx
          </p>
        </div>
      </Upload.Dragger>
    </div>
  )
}
