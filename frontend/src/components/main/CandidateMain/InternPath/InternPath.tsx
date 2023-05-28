import { InternshipStage, Period } from "data/types"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import styles from "./InternPath.module.scss"

dayjs.extend(isBetween)

enum InternStage {
  requests = "requests",
  studying = "studying",
  testing = "testing",
  hackathon = "hackathon",
  internship = "internship",
}

const internPath = [
  InternStage.requests,
  InternStage.studying,
  InternStage.testing,
  InternStage.hackathon,
  InternStage.internship,
]

export const stageTitles: Record<InternStage, string> = {
  [InternStage.requests]: "Заявка на стажировку",
  [InternStage.studying]: "Обучение в карьерной школе",
  [InternStage.testing]: "Тестирование",
  [InternStage.hackathon]: "Кейс-чемпионат",
  [InternStage.internship]: "Стажировка и трудоустройство",
}

export const stageDescriptions: Record<InternStage, string> = {
  [InternStage.requests]:
    "Расскажи о себе и прими участие в отборе на стажировку",
  [InternStage.studying]:
    "Узнай все о структуре Правительства Москвы и познакомься с лучшими городскими проектами",
  [InternStage.testing]:
    "Пройди онлайн-тест на умение анализировать информацию, знание русского языка и компьютерную грамотность",
  [InternStage.hackathon]:
    "Разработай свой проект с командой единомышленников и защити его",
  [InternStage.internship]:
    "Вливайся в команду Правительства Москвы в числе 125 лучших стажеров, знакомься с коллегами и вместе с ними выполняй реальные задачи.",
}

const isStageActive = (
  currentStage: InternStage,
  stages?: Record<InternshipStage, Period>
) => {
  if (!stages) return false

  const today = dayjs()

  if (currentStage === InternStage.internship) {
    return dayjs(today).isBetween(
      stages.internship1.start,
      stages.internship3.end
    )
  }

  return dayjs(today).isBetween(
    stages[currentStage].start,
    stages[currentStage].end
  )
}

const formatPeriod = (
  currentStage: InternStage,
  stages?: Record<InternshipStage, Period>
) => {
  if (!stages) return ""

  if (currentStage === InternStage.internship) {
    return `${stages.internship1.start} - ${stages.internship3.end}`
  }

  return `${stages[currentStage].start} - ${stages[currentStage].end}`
}

interface InternPathProps {
  stages?: Record<InternshipStage, Period>
}

export default function InternPath({ stages }: InternPathProps) {
  return (
    <div className={styles.timeline}>
      {internPath.map((item) => (
        <div
          key={item}
          className={`${styles.timelineItem} ${
            isStageActive(item, stages) ? styles.active : ""
          }`}
        >
          <span className={styles.timelineItemMarker}></span>
          <div className={styles.timelineItemContent}>
            <div className={styles.timelineItemHeader}>
              <p className={styles.timelineItemDates}>
                {formatPeriod(item, stages)}
              </p>
              <h3 className={styles.timelineItemTitle}>{stageTitles[item]}</h3>
            </div>
            <div className={styles.timelineItemDescription}>
              {item === InternStage.internship ? (
                <div>
                  {stageDescriptions[item]}
                  <p className={styles.colored}>
                    Прояви себя как профессионал и получи предложение о
                    трудоустройстве в Правительство Москвы
                  </p>
                </div>
              ) : (
                stageDescriptions[item]
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
