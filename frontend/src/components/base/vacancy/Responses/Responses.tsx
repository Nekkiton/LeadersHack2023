import Select from "components/base/controls/Select"
import styles from "./Responses.module.scss"
import NothingIcon from "assets/icons/document-search.svg"
import ResponseCard from "../ResponseCard"

interface Props {
  link: string
}

export default function Responses({ link }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h2>Отклики</h2>
          <span className={styles.headerCount}>8 (+3 новых)</span>
        </div>
        <Select
          className={styles.headerSelect}
          placeholder="Все статусы"
          multiple
        />
      </div>
      {false ? (
        <>
          <NothingIcon className={styles.nothingIcon} />
          <p className={styles.nothingText}>Откликов еще нет</p>
        </>
      ) : (
        <div className={styles.responses}>
          <ResponseCard link={link} />
          <ResponseCard link={link} />
        </div>
      )}
    </div>
  )
}
