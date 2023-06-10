import { useState } from "react"
import Button from "components/base/controls/Button"
import ChevronUpIcon from "assets/icons/chevron-up.svg"
import styles from "./Points.module.scss"

interface Props {
  score: number
  details: {
    title: string
    score: number | null
  }[]
}

export default function Points({ score, details }: Props) {
  const [isDetailsShowed, setIsDetailsShowed] = useState(false)

  return (
    <div
      className={`${styles.container} ${isDetailsShowed ? styles.active : ""}`}
    >
      <p className={styles.title}>Набрано баллов</p>
      <h3>{score}</h3>
      <Button
        className={styles.btn}
        type="text"
        onClick={() => setIsDetailsShowed(!isDetailsShowed)}
      >
        <span>За что баллы</span>
        <ChevronUpIcon className={`icon ${styles.btnIcon}`} />
      </Button>
      <div className={styles.scoreDetails}>
        {details.map((item, idx) => (
          <div className={styles.scoreDetailsItem} key={idx}>
            <span>{item.title}</span>
            <span className={styles.scoreDetailsItemDivider}></span>
            <span>{item.score}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
