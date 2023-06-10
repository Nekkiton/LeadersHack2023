import Link from "next/link"
import Button from "components/base/controls/Button"
import NoDocumentIcon from "assets/icons/no-document.svg"
import LinkExternalIcon from "assets/icons/link-external.svg"
import styles from "./InternshipApp.module.scss"
import { Spin } from "antd"
import { useQuery } from "@tanstack/react-query"
import { fetchInternshipApplication } from "data"
import AppTimeline from "./AppTimeline"
import { formatDate } from "utils/formatDate"

export default function InternshipApp() {
  const { data, isLoading } = useQuery({
    queryKey: ["internshipApplication"],
    queryFn: () => fetchInternshipApplication(),
  })

  if (isLoading) return <Spin />

  // TODO: add modal
  const isReceptionOpen = true
  const status: string = data?.status ?? ""
  const score = data?.score
  const rejection = data?.data
  const internship = data?.internship

  const totalScore = Object.values(score ?? {}).reduce(
    (previousValue, currentValue) => (previousValue ?? 0) + (currentValue ?? 0),
    0
  )

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Заявка на стажировку {internship?.year}</h1>
      {!data ? (
        <div className={styles.nothing}>
          <NoDocumentIcon className={styles.nothingIcon} />
          <div className={styles.nothingText}>
            <h3 className={styles.nothingTitle}>
              {isReceptionOpen
                ? "Ты еще не подал заявку"
                : "Ты не подал заявку"}
            </h3>
            <p className={styles.nothingDescription}>
              {isReceptionOpen
                ? "Чтобы попасть на стажировку, нужно заполнить анкету кандидата до 21 апреля 2023"
                : "К сожалению, набор кандидатов на стажировку в этом году закончен. Подпишись на уведомления, чтобы не пропустить набор на следующий год"}
            </p>
          </div>
          {/* TODO: button does not work */}
          {isReceptionOpen ? (
            <Link className={styles.nothingLink} href="/intern/register">
              <Button>Подать заявку</Button>
            </Link>
          ) : (
            <Button className={styles.nothingLink}>Узнать о старте</Button>
          )}
        </div>
      ) : (
        <>
          <AppTimeline activeStatus={data.status} />
          {rejection?.rejectedOn && (
            <div className={`${styles.card} ${styles.comment}`}>
              <p className={styles.cardTitle}>Причина отклонения</p>
              <p>{rejection.rejectionReason}</p>
            </div>
          )}
          <div className={styles.cards}>
            <div className={`${styles.card} ${styles.hint}`}>
              <p className={styles.cardTitle}>Что дальше</p>
              {status === "moderation" && (
                <>
                  <p>
                    Сейчас заявку смотрят кураторы. Они оценят твой опыт работы
                    и проектной деятельности и начислят баллы. Чем больше баллов
                    ты наберешь, тем выше шанс попасть на стажировку.
                  </p>
                  {internship?.trainingStart && internship?.trainingEnd ? (
                    <p>
                      Дождись начала обучения. Оно пройдет{" "}
                      {formatDate(internship?.trainingStart, "D MMMM")} -{" "}
                      {formatDate(internship?.trainingEnd, "D MMMM")}. Ссылка на
                      обучение появится здесь
                    </p>
                  ) : null}
                </>
              )}
              {/* TODO: no such status */}
              {status === "waitStudying" && (
                <>
                  <p>
                    Дождись начала обучения. Оно пройдет{" "}
                    {formatDate(internship?.trainingStart, "D MMMM")} -{" "}
                    {formatDate(internship?.trainingEnd, "D MMMM")}. Ссылка на
                    расписание и обучение появится здесь.
                  </p>
                  <p>
                    Обучение пройдет в онлайн-формате. Будет 5 вебинаров,
                    которые можно посетить онлайн или посмотреть в записи
                  </p>
                </>
              )}
              {status === "training" && (
                <div className={styles.hintWithBtn}>
                  <p>
                    До {formatDate(internship?.trainingEnd, "D MMMM")} идет
                    обучение. Советуем посещать занятия онлайн,
                    чтобы познакомиться со спикерами и иметь возможность
                    задавать им вопросы вживую
                  </p>

                  <Button href={internship?.trainingLink}>
                    <span>Перейти к обучению</span>
                    <LinkExternalIcon className="icon" />
                  </Button>
                </div>
              )}
              {/* TODO: no such status */}
              {status === "waitTesting" && (
                <p>
                  {formatDate(internship?.examinationStart, "D MMMM")} -{" "}
                  {formatDate(internship?.examinationEnd, "D MMMM")} будет
                  доступно тестирование для проверки знаний, полученных
                  на обучении. По итогам тестирования будут отобраны 400 человек
                  для прохождения дальнейших этапов
                </p>
              )}
              {status === "examination" && (
                <div className={styles.hintWithBtn}>
                  <p>
                    Пройди тестирование до{" "}
                    {formatDate(internship?.examinationEnd, "D MMMM")}, чтобы
                    пройти в следующий этап отбора. Оно займет 30 минут и у тебя
                    будет 1 попытка
                  </p>

                  <Button href={internship?.examinationLink}>
                    <span>Пройти тестирование</span>
                    <LinkExternalIcon className="icon" />
                  </Button>
                </div>
              )}
              {/* TODO: no such status */}
              {status === "waitCompetition" && (
                <p>
                  Поздравляем, тестирование пройдено!{" "}
                  {formatDate(internship?.examinationEnd, "D MMMM")} мы объявим
                  результаты и узнаем, кто пройдет на следующий эта отбора
                </p>
              )}
              {status === "championship" && (
                <div className={styles.hintWithBtn}>
                  <p>
                    Финальный этап отбора пройдет{" "}
                    {formatDate(internship?.championshipStart, "D MMMM")} -{" "}
                    {formatDate(internship?.championshipEnd, "D MMMM")}. Вы
                    разделитесь на команды и подготовите проекты по заданной
                    теме. 2 июня пройдет защита проектов, по результатам которой
                    лучшие кандидаты попадут на стажировку.
                  </p>
                  <p>
                    Вся информация о чемпионате будет в telegram-канале.
                    Присоединяйся
                  </p>

                  <Button href={internship?.championshipLink}>
                    <LinkExternalIcon className="icon" />
                    <span>Перейти в telegram-канал</span>
                    <LinkExternalIcon />
                  </Button>
                </div>
              )}
              {rejection?.rejectedOn && (
                <div className={styles.hintWithBtn}>
                  <p>
                    Попробуй подать заявку на стажировку в следующем году. А
                    чтобы не пропустить начало подачи заявок, подпишись
                    на уведомления
                  </p>
                  {/* TODO: button does not work */}
                  <Button type="secondary">Узнать о старте</Button>
                </div>
              )}
              {status === "completed" && (
                <div className={styles.hintWithBtn}>
                  <p>
                    Поздравляем, отбор пройден! Ты в числе лучших 125 человек,
                    которые прошли на стажировку. Выбирай, где ты хочешь
                    стажироваться и подавай заявки. Желаем удачи
                  </p>
                  {/* TODO: button does not work */}
                  <Link
                    className={styles.hintWithBtnLink}
                    href="/intern/vacancies"
                  >
                    <Button>Перейти к вакансиям</Button>
                  </Link>
                </div>
              )}
            </div>
            <div className={`${styles.card} ${styles.score}`}>
              <div className={styles.scoreHeader}>
                <p className={styles.cardTitle}>Набрано баллов:</p>
                <h4>{totalScore}</h4>
              </div>

              <div className={styles.scoreDetails}>
                {score?.workSchedule ? (
                  <div className={styles.scoreDetailsItem}>
                    <span>График работы</span>
                    <span className={styles.scoreDetailsItemDivider}></span>
                    <span>{score.workSchedule}</span>
                  </div>
                ) : null}

                {score?.experience ? (
                  <div className={styles.scoreDetailsItem}>
                    <span>Опыт работы</span>
                    <span className={styles.scoreDetailsItemDivider}></span>
                    <span>{score.experience}</span>
                  </div>
                ) : null}

                {score?.projectActivity ? (
                  <div className={styles.scoreDetailsItem}>
                    <span>Проектная деятельность</span>
                    <span className={styles.scoreDetailsItemDivider}></span>
                    <span>{score.projectActivity}</span>
                  </div>
                ) : null}

                {score?.about ? (
                  <div className={styles.scoreDetailsItem}>
                    <span>О себе</span>
                    <span className={styles.scoreDetailsItemDivider}></span>
                    <span>{score.about}</span>
                  </div>
                ) : null}

                {score?.examination ? (
                  <div className={styles.scoreDetailsItem}>
                    <span>Тестирование</span>
                    <span className={styles.scoreDetailsItemDivider}></span>
                    <span>{score.examination}</span>
                  </div>
                ) : null}

                {score?.championship ? (
                  <div className={styles.scoreDetailsItem}>
                    <span>Кейс-чемпионат</span>
                    <span className={styles.scoreDetailsItemDivider}></span>
                    <span>{score.championship}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
