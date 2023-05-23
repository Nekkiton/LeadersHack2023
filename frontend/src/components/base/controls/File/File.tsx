import styles from "./File.module.scss"
import DocumentIcon from "assets/icons/document2.svg"

interface Props {
  name?: string
  size?: string
}

export default function File({ name, size }: Props) {
  return (
    <div className={styles.file}>
      <div className={styles.fileNameContainer}>
        <DocumentIcon className={styles.fileIcon} />
        <span>{name}</span>
      </div>
      <span className={styles.fileSize}>{size}</span>
    </div>
  )
}
