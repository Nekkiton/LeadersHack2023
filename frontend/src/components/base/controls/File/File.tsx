import styles from "./File.module.scss"
import DocumentIcon from "assets/icons/document2.svg"
import TimesIcon from "assets/icons/times.svg"

interface Props {
  name?: string
  size?: string | number
  onRemove?: () => void
}

export default function File({ name, size, onRemove }: Props) {
  return (
    <div className={styles.file}>
      <div className={styles.fileNameContainer}>
        <DocumentIcon className={styles.fileIcon} />
        <span>{name}</span>
      </div>
      <span className={styles.fileSize}>{size}</span>
      {onRemove && (
        <TimesIcon className={styles.fileRemoveIcon} onClick={onRemove} />
      )}
    </div>
  )
}
