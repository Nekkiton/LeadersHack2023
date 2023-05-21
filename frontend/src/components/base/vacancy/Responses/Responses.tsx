import Select from "components/base/controls/Select"
import styles from "./Responses.module.scss"
import NothingIcon from "assets/icons/document-search.svg"
import ResponseCard from "../ResponseCard"
import { ResponseData } from "data/fetchVacancyInfo"

interface ResponsesProps {
  link: string
  responses: ResponseData[]
  responsesCount: number
  responsesCountNew: number
}

export default function Responses({
  link,
  responses,
  responsesCount,
  responsesCountNew,
}: ResponsesProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h2>Отклики</h2>
          <span className={styles.headerCount}>
            {responsesCount} (+{responsesCountNew} новых)
          </span>
        </div>
        <Select
          className={styles.headerSelect}
          placeholder="Все статусы"
          multiple
        />
      </div>
      {!responses.length ? (
        <>
          <NothingIcon className={styles.nothingIcon} />
          <p className={styles.nothingText}>Откликов еще нет</p>
        </>
      ) : (
        <div className={styles.responses}>
          {responses.map((response) => (
            <ResponseCard
              key={response.id}
              responseInfo={response}
              link={link}
            />
          ))}
        </div>
      )}
    </div>
  )
}
