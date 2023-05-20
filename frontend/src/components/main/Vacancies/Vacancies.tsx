import { useState } from "react"
import Button from "components/base/controls/Button"
import Select from "components/base/controls/Select"
import Input from "components/base/controls/Input"
import Pagination from "components/base/navigation/Pagination"
import VacancyStatus from "components/base/vacancy/Status"
import styles from "./Vacancies.module.scss"
import { ReactComponent as PlusIcon } from "assets/icons/plus.svg"
import { ReactComponent as SearchIcon } from "assets/icons/search.svg"
import { ReactComponent as NothingIcon } from "assets/icons/nothing.svg"
import { ReactComponent as TimesIcon } from "assets/icons/times.svg"
import userImg from "assets/images/user.svg"

export default function Vacancies() {
  const [query, setQuery] = useState("")
  const [statuses, setStatuses] = useState([])
  const [mentors, setMentors] = useState([])

  const clearFilters = () => {
    setQuery("")
    setStatuses([])
    setMentors([])
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Заявки на стажеров</h1>
        <Button>
          <PlusIcon className="icon" />
          <span>Подать заявку</span>
        </Button>
      </div>
      {false ? (
        <div className={styles.nothing}>
          <NothingIcon />
          <p className={styles.nothingText}>
            Вы еще не создали ни одной заявки.
            <br />
            Самое время это исправить
          </p>
          <Button>
            <PlusIcon className="icon" />
            <span>Подать заявку</span>
          </Button>
        </div>
      ) : (
        <>
          <div className={styles.filters}>
            <div className={styles.filtersFields}>
              <Input
                className={styles.filtersInput}
                prefix={<SearchIcon />}
                placeholder="Поиск по вакансиям"
                value={query}
                onChange={setQuery}
              />
              <Select
                placeholder="Все статусы"
                items={{
                  active: <VacancyStatus status="active" />,
                  archived: <VacancyStatus status="archived" />,
                }}
                value={statuses}
                onChange={setStatuses}
              />
              <Select
                placeholder="Все наставники"
                items={{
                  1: (
                    <div className={styles.filtersMentor}>
                      <img className={styles.filtersMentorImg} src={userImg} />
                      <p className={styles.filtersMentorName}>
                        Юлиана Митрофанова
                      </p>
                    </div>
                  ),
                }}
                value={mentors}
                onChange={setMentors}
              />
            </div>
            {(query || !!statuses.length || !!mentors.length) && (
              <Button
                className={styles.filtersClear}
                type="text"
                onClick={clearFilters}
              >
                <TimesIcon className="icon" />
                <span>Сбросить все</span>
              </Button>
            )}
          </div>
          <div className={styles.vacancies}>
            <div className={styles.vacancy}>
              <div className={styles.vacancyHeader}>
                <span>Заявка №1902 от 20 иолюя 2023</span>
                <VacancyStatus
                  className={styles.vacancyStatus}
                  status="active"
                />
              </div>
              <div className={styles.vacancyBody}>
                <div className={styles.vacancyInfo}>
                  <p className={styles.vacancyName}>UX/UI дизайнер</p>
                  <p className={styles.vacancyLocation}>
                    Карьерный центр Правительства Москвы
                  </p>
                </div>
                <div className={styles.vacancyUser}>
                  <img className={styles.vacancyUserImg} src={userImg} />
                  <div className={styles.vacancyUserInfo}>
                    <p className={styles.vacancyUserName}>Юлиана Митрофанова</p>
                    <p className={styles.vacancyUserRole}>Наставник</p>
                  </div>
                </div>
              </div>
              <div className={styles.vacancyResponses}>
                <Button className={styles.vacancyResponsesBtn} type="text">
                  <span>19 откликов</span>
                  <span className={styles.vacancyResponsesNew}>(+5 новых)</span>
                </Button>
              </div>
            </div>
          </div>
          <Pagination />
        </>
      )}
    </div>
  )
}
