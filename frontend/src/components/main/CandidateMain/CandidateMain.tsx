import { useState } from "react"
import Link from "next/link"
import Button from "components/base/controls/Button"
import InternshipReminderModal from "components/main/modals/InternshipReminder"
import StudentEmoji from "assets/icons/student-emoji.svg"
import ProgrammerEmoji from "assets/icons/programmer-emoji.svg"
import WaiterEmoji from "assets/icons/waiter-emoji.svg"
import styles from "./CandidateMain.module.scss"
import InternPath from "./InternPath"
import { fetchInternshipSchedule } from "data"
import { useQuery } from "@tanstack/react-query"

export default function CandidateMain() {
  const { data } = useQuery({
    queryKey: ["internshipSchedule"],
    queryFn: fetchInternshipSchedule,
  })

  // TODO: fetch data
  const isReceptionOpen = true

  const [isInternshipReminderShowed, setIsInternshipReminderShowed] =
    useState(false)

  return (
    <>
      <div className={styles.container}>
        <div
          className={`${styles.intro} ${!isReceptionOpen ? styles.orange : ""}`}
        >
          <img
            className={styles.introImg}
            src={
              isReceptionOpen
                ? "/images/candidate-intro-man.png"
                : "/images/candidate-intro-girl.png"
            }
          />
          <div className={styles.introContent}>
            <p className={styles.introTitle}>
              Открыт прием заявок
              <br />
              на стажировку 2023 — 2024
            </p>
            <p className={styles.introDescription}>
              Хочешь получить опыт работы на реальных объектах столичной
              инфраструктуры и проявить себя в лучших командах городского
              управления?
            </p>
            {isReceptionOpen ? (
              <Link href="/intern/register" className={styles.introBtn}>
                <Button style={{ width: "100%" }}>Подавай заявку</Button>
              </Link>
            ) : (
              <Button
                onClick={() => setIsInternshipReminderShowed(true)}
                className={styles.introBtn}
              >
                Узнать о старте
              </Button>
            )}
          </div>
        </div>
        <div className={styles.block}>
          <h2>Подойдет, если ты</h2>
          <div className={styles.who}>
            <div className={styles.whoItem}>
              <ProgrammerEmoji className={styles.whoItemIcon} />
              <p>Студент 4 курса</p>
            </div>
            <div className={styles.whoItem}>
              <StudentEmoji className={styles.whoItemIcon} />
              <p>Магистрант</p>
            </div>
            <div className={styles.whoItem}>
              <WaiterEmoji className={styles.whoItemIcon} />
              <p>Выпускник ВУЗа</p>
            </div>
          </div>
        </div>
        <div className={styles.block}>
          <h2>Зачем тебе это</h2>
          <div className={styles.why}>
            <div className={styles.whyItem}>
              <p className={styles.whyItemTitle}>Найди, что вдохновляет</p>
              <p className={styles.whyItemText}>
                Полгода стажировки{" "}
                <span className={styles.colored}>
                  в трех разных организациях
                </span>{" "}
                — три возможности обрести свое призвание
              </p>
            </div>
            <div className={styles.whyItem}>
              <p className={styles.whyItemTitle}>
                Выбери график работы и зарплату
              </p>
              <p className={styles.whyItemText}>
                Работай 20 либо 40 часов в неделю и получай зарплату 24 600 или
                49 200 рублей в месяц
              </p>
            </div>
            <div className={styles.whyItem}>
              <p className={styles.whyItemTitle}>Получи оффер</p>
              <p className={styles.whyItemText}>
                Более 60% выпускников стажировки получают предложение о
                дальнейшем трудоустройстве
              </p>
            </div>
          </div>
        </div>
        <div className={styles.block}>
          <h2>Направления стажировки</h2>
          <div className={styles.directions}>
            <span className={styles.direction}>IT-город</span>
            <span className={styles.direction}>Медийный город</span>
            <span className={styles.direction}>Социальный город</span>
            <span className={styles.direction}>HR-город</span>
            <span className={styles.direction}>Комфортная городская среда</span>
            <span className={styles.direction}>Городская экономика</span>
          </div>
        </div>
        <div className={styles.timelineContainer}>
          <h2>Путь стажера</h2>
          <InternPath stages={data} />
        </div>
      </div>

      <InternshipReminderModal
        isShowed={isInternshipReminderShowed}
        setIsShowed={setIsInternshipReminderShowed}
      />
    </>
  )
}
