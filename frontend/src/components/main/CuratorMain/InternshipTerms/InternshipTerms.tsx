import { InternshipStage, Period } from "data/types"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import styles from "./InternshipTerms.module.scss"

dayjs.extend(isBetween)

const internshipTimeline = [
  InternshipStage.requests,
  InternshipStage.studying,
  InternshipStage.testing,
  InternshipStage.hackathon,
  InternshipStage.assignment,
  InternshipStage.internship1,
  InternshipStage.internship2,
  InternshipStage.internship3,
]

export const stageTitles: Record<InternshipStage, string> = {
  [InternshipStage.requests]: "Прием заявок",
  [InternshipStage.studying]: "Обучение",
  [InternshipStage.testing]: "Тестирование",
  [InternshipStage.hackathon]: "Кейс-чемпионат",
  [InternshipStage.assignment]: "Распределение",
  [InternshipStage.internship1]: "Стажировка. Спринт 1",
  [InternshipStage.internship2]: "Стажировка. Спринт 2",
  [InternshipStage.internship3]: "Стажировка. Спринт 3",
}

const getStatus = (datesPeriod?: Period) => {
  if (!datesPeriod) return ""

  const today = dayjs()

  if (dayjs(today).isBetween(datesPeriod.start, datesPeriod.end)) {
    return "active"
  }

  if (today.isAfter(dayjs(datesPeriod.end))) {
    return "past"
  }

  return ""
}

const formatPeriod = (datesPeriod?: Period) => {
  if (!datesPeriod) return ""

  return `${datesPeriod.start} - ${datesPeriod.end}`
}

interface InternshipTermsProps {
  stages?: Record<InternshipStage, Period>
}

export default function InternshipTerms({ stages }: InternshipTermsProps) {
  return (
    <div className={styles.timeline}>
      {internshipTimeline.map((item) => (
        <div
          key={item}
          className={`${styles.timelineItem} ${
            styles[getStatus(stages?.[item])]
          }`}
        >
          <span className={styles.timelineItemDot} />
          <div>
            <p className={styles.timelineItemTitle}>{stageTitles[item]}</p>
            <p className={styles.timelineItemDates}>
              {formatPeriod(stages?.[item])}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
