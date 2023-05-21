import styles from "./File.module.scss"
import DocumentIcon from "assets/icons/document2.svg"

export default function File() {
  return (
    <div className={styles.file}>
      <div className={styles.fileNameContainer}>
        <DocumentIcon className={styles.fileIcon} />
        <span>Document_name... .pdf</span>
      </div>
      <span className={styles.fileSize}>2 Mb</span>
    </div>
  )
}
