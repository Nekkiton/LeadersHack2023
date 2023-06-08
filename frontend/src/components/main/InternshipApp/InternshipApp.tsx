import Link from "next/link"
import Button from "components/base/controls/Button"
import NoDocumentIcon from "assets/icons/no-document.svg"
import LinkExternalIcon from "assets/icons/link-external.svg"
import styles from "./InternshipApp.module.scss"
import { Spin } from "antd"
import { useQuery } from "@tanstack/react-query"
import { fetchInternshipApplication } from "data"

export default function InternshipApp() {
  const { data, isLoading } = useQuery({
    queryKey: ["internshipApplication"],
    queryFn: () => fetchInternshipApplication(),
  })

  if (isLoading) return <Spin />
  console.log("👾 ~ InternshipApp ~ data:", data)

  // TODO: add modal
  const isReceptionOpen = true
  const status: string = "moderating" // waitStuding, studying, waitTesting, testing, waitCompetition, competition, rejected, accepted
  const timeline = [
    {
      title: "Заявка принята",
      status: "past",
    },
    {
      title: "На модерации",
      status: "moderation",
    },
    {
      title: "Обучение",
      status: "training",
    },
    {
      title: "Тестирование",
      status: "examination",
    },
    {
      title: "Кейс-чемпионат",
      status: "championship",
    },
    {
      title: "Заявка одобрена",
      status: "completed",
    },
  ]

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Заявка на стажировку 2023 — 2024</h1>
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
          <div className={`${"s"} ${styles.timeline}`}>
            {timeline.map((item) => (
              <div
                className={`${styles.timelineItem} ${styles[item.status]}`}
                key={item.title}
              >
                <span className={styles.timelineItemMark}></span>
                <p>{item.title}</p>
              </div>
            ))}
          </div>
          {/* TODO: different comments for different reasons */}
          {status === "rejected" && (
            <div className={`${styles.card} ${styles.comment}`}>
              <p className={styles.cardTitle}>Причина отклонения</p>
              <p>
                К сожалению, на кейс-чемпионате ты не смог показать достаточный
                уровень знаний
              </p>
            </div>
          )}
          <div className={styles.cards}>
            <div className={`${styles.card} ${styles.hint}`}>
              <p className={styles.cardTitle}>Что дальше</p>
              {status === "moderating" && (
                <>
                  <p>
                    Сейчас заявку смотрят кураторы. Они оценят твой опыт работы
                    и проектной деятельности и начислят баллы. Чем больше баллов
                    ты наберешь, тем выше шанс попасть на стажировку.
                  </p>
                  <p>
                    Дождись начала обучения. Оно пройдет 24 — 28 апреля. Ссылка
                    на обучение появится здесь
                  </p>
                </>
              )}
              {status === "waitStudying" && (
                <>
                  <p>
                    Дождись начала обучения. Оно пройдет 24 — 28 апреля. Ссылка
                    на расписание и обучение появится здесь.
                  </p>
                  <p>
                    Обучение пройдет в онлайн-формате. Будет 5 вебинаров,
                    которые можно посетить онлайн или посмотреть в записи
                  </p>
                </>
              )}
              {status === "studying" && (
                <div className={styles.hintWithBtn}>
                  <p>
                    До 28 апреля идет обучение. Советуем посещать занятия
                    онлайн, чтобы познакомиться со спикерами и иметь возможность
                    задавать им вопросы вживую
                  </p>
                  {/* TODO: add link */}
                  <Button>
                    <span>Перейти к обучению</span>
                    <LinkExternalIcon className="icon" />
                  </Button>
                </div>
              )}
              {status === "waitTesting" && (
                <p>
                  15 — 19 мая будет доступно тестирование для проверки знаний,
                  полученных на обучении. По итогам тестирования будут отобраны
                  400 человек для прохождения дальнейших этапов
                </p>
              )}
              {status === "testing" && (
                <div className={styles.hintWithBtn}>
                  <p>
                    Пройди тестирование до 19 мая, чтобы пройти в следующий этап
                    отбора. Оно займет 30 минут и у тебя будет 1 попытка
                  </p>
                  {/* TODO: add link */}
                  <Button>
                    <span>Пройти тестирование</span>
                    <LinkExternalIcon className="icon" />
                  </Button>
                </div>
              )}
              {status === "waitCompetition" && (
                <p>
                  Поздравляем, тестирование пройдено! 20 мая мы объявим
                  результаты и узнаем, кто пройдет на следующий эта отбора
                </p>
              )}
              {status === "competition" && (
                <div className={styles.hintWithBtn}>
                  <p>
                    Финальный этап отбора пройдет 29 мая — 2 июня. Вы
                    разделитесь на команды и подготовите проекты по заданной
                    теме. 2 июня пройдет защита проектов, по результатам которой
                    лучшие кандидаты попадут на стажировку.
                  </p>
                  <p>
                    Вся информация о чемпионате будет в telegram-канале.
                    Присоединяйся
                  </p>
                  {/* TODO: add link */}
                  <Button>
                    <LinkExternalIcon className="icon" />
                    <span>Перейти в telegram-канал</span>
                    <LinkExternalIcon />
                  </Button>
                </div>
              )}
              {status === "rejected" && (
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
              {status === "accepted" && (
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
                <h4>5</h4>
              </div>
              {/* TODO: manage visiblibty */}
              <div className={styles.scoreDetails}>
                <div className={styles.scoreDetailsItem}>
                  <span>График работы</span>
                  <span className={styles.scoreDetailsItemDivider}></span>
                  <span>5</span>
                </div>
                <div className={styles.scoreDetailsItem}>
                  <span>Опыт работы</span>
                  <span className={styles.scoreDetailsItemDivider}></span>
                  <span>5</span>
                </div>
                <div className={styles.scoreDetailsItem}>
                  <span>Проектная деятельность</span>
                  <span className={styles.scoreDetailsItemDivider}></span>
                  <span>5</span>
                </div>
                <div className={styles.scoreDetailsItem}>
                  <span>О себе</span>
                  <span className={styles.scoreDetailsItemDivider}></span>
                  <span>5</span>
                </div>
                <div className={styles.scoreDetailsItem}>
                  <span>Тестирование</span>
                  <span className={styles.scoreDetailsItemDivider}></span>
                  <span>5</span>
                </div>
                <div className={styles.scoreDetailsItem}>
                  <span>Кейс-чемпионат</span>
                  <span className={styles.scoreDetailsItemDivider}></span>
                  <span>5</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
