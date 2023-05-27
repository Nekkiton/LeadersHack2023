import { useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import Select from "components/base/controls/Select"
import Button from "components/base/controls/Button"
import EventIcon from "assets/icons/event.svg"
import SearchBlockIcon from "assets/icons/search-block.svg"
import PenIcon from "assets/icons/pen.svg"
import styles from "./CuratorMain.module.scss"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const ChartNothing = () => (
  <div className={`${styles.card} ${styles.chartNothing}`}>
    <SearchBlockIcon className={styles.chartNothingIcon} />
    <div className={styles.chartNothingText}>
      <p className={styles.chartNothingTitle}>Данных еще нет</p>
      <p className={styles.chartNothingDescription}>
        Когда кандидаты начнут подавать заявки, статистические данные будут
        отображаться тут
      </p>
    </div>
  </div>
)

interface DonutChartProps {
  series: number[]
  labels: string[]
  title: string
}

const DonutChart = ({ series, labels, title }: DonutChartProps) => (
  <div className={styles.card}>
    <Chart
      className={styles.chart}
      type="donut"
      series={series}
      height="400"
      options={{
        chart: {
          fontFamily: "GT Walsheim LC",
        },
        labels: labels,
        legend: {
          position: "bottom",
        },
        colors: [
          "#66C1AC",
          "#FA8079",
          "#A2D7FC",
          "#FFC48D",
          "#FEA3DA",
          "#9492FF",
          "#ECFAB6",
        ],
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true,
                  label: title,
                },
              },
            },
          },
        },
      }}
    />
  </div>
)

export default function CuratorMain() {
  const [candidatesChart, setCandidatesChart] = useState("responsesCount")
  const [vacanciesChart, setVacanciesChart] = useState("status")

  // TODO: fetch data
  const candidatesData = {
    responsesCount: {
      series: [5, 1],
      labels: ["Релевантные", "Нерелевантные"],
      title: "Всего заявок",
    },
    age: {
      series: [1, 2, 3, 4, 5, 6],
      labels: [
        "До 18 лет",
        "18 - 20 лет",
        "21 - 23 года",
        "24 - 28 лет",
        "28 - 35 лет",
        "старше 35 лет",
      ],
      title: "Всего заявок",
    },
  } as any

  const timeline = [
    {
      title: "Прием заявок",
      dates: "1 февраля - 21 апреля 2023",
      status: "past",
    },
    {
      title: "Обучение",
      dates: "1 февраля - 21 апреля 2023",
      status: "active",
    },
    {
      title: "Тестирование",
      dates: "1 февраля - 21 апреля 2023",
      status: "soon",
    },
    {
      title: "Тестирование1",
      dates: "1 февраля - 21 апреля 2023",
      status: "soon",
    },
    {
      title: "Тестирование2",
      dates: "1 февраля - 21 апреля 2023",
      status: "soon",
    },
    {
      title: "Тестирование3",
      dates: "1 февраля - 21 апреля 2023",
      status: "soon",
    },
    {
      title: "Тестирование4",
      dates: "1 февраля - 21 апреля 2023",
      status: "soon",
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={styles.blockHeader}>
          <h3 className={styles.fatBlockTitle}>Таймлайн стажировки</h3>
          {/* TODO: show if editing is enabled */}
          {true && (
            <Link href="/curator/internship">
              <Button type="text">
                <PenIcon className="icon" />
                <span>Редактировать</span>
              </Button>
            </Link>
          )}
        </div>
        {/* TODO: show if no timeline */}
        {false ? (
          <div className={`${styles.card} ${styles.timelineNothing}`}>
            <div className={styles.timelineNothingMsg}>
              <EventIcon className={styles.timelineNothingIcon} />
              <p>Сроки стажировки 2023 - 2024 еще не определены</p>
            </div>
            <Link href="/curator/internship">
              <Button>Задать сроки стажировки</Button>
            </Link>
          </div>
        ) : (
          <div className={`${styles.card} ${styles.timelineCard}`}>
            <div className={styles.timeline}>
              {timeline.map((item) => (
                <div
                  className={`${styles.timelineItem} ${styles[item.status]}`}
                  key={item.title + item.dates}
                >
                  <span className={styles.timelineItemDot} />
                  <div>
                    <p className={styles.timelineItemTitle}>{item.title}</p>
                    <p className={styles.timelineItemDates}>{item.dates}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={styles.hBlocks}>
        <div className={styles.block}>
          <div className={styles.blockHeader}>
            <h3>Кандидаты</h3>
            <Select
              className={styles.blockSelect}
              placeholder="Количество заявок"
              items={[
                { key: "responsesCount", value: "Количество заявок" },
                { key: "age", value: "Возраст" },
                { key: "towns", value: "Города" },
                { key: "universities", value: "ВУЗы" },
                { key: "workExp", value: "Опыт работы" },
                { key: "internshipDir", value: "Направление стажировки" },
              ]}
              value={candidatesChart}
              onChange={(val) => val && setCandidatesChart(val)}
              same
            />
          </div>
          {/* TODO: show if no data */}
          {false ? (
            <ChartNothing />
          ) : (
            <DonutChart
              series={candidatesData[candidatesChart].series}
              labels={candidatesData[candidatesChart].labels}
              title={candidatesData[candidatesChart].title}
            />
          )}
        </div>
        <div className={styles.block}>
          <div className={styles.blockHeader}>
            <h3>Вакансии</h3>
            <Select
              className={styles.blockSelect}
              placeholder="Статус вакансий"
              value={vacanciesChart}
              onChange={setVacanciesChart}
              items={[{ key: "status", value: "Статус вакансий" }]}
              disabled
              same
            />
          </div>
          <ChartNothing />
        </div>
      </div>
    </div>
  )
}
