import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import Button from "components/base/controls/Button"
import Select from "components/base/controls/Select"
import Input from "components/base/controls/Input"
import Pagination from "components/base/navigation/Pagination"
import VacancyStatus from "components/base/vacancy/Status"
import SmallSwitch from "components/base/controls/SmallSwitch"
import Map from "components/base/Map"
import MobileFilters from "components/base/MobileFilters"
import PlusIcon from "assets/icons/plus.svg"
import SearchIcon from "assets/icons/search.svg"
import NothingIcon from "assets/icons/document-search.svg"
import TimesIcon from "assets/icons/times.svg"
import ListIcon from "assets/icons/list.svg"
import MapIcon from "assets/icons/map.svg"
import VacancyCard from "components/base/vacancy/VacancyCard"
import VacancyMapCard from "components/base/vacancy/VacancyMapCard"
import { fetchVacancyList } from "data"
import styles from "./Vacancies.module.scss"
import { Spin } from "antd"

interface Props {
  link: string
  noHeader?: boolean
}

const userImg = "/images/user.svg"

export default function Vacancies({ link, noHeader }: Props) {
  const user = {
    //role: "mentor",
    //role: "staff",
    //role: "curator",
    role: "intern",
  }

  // TODO: fetch mentors for staff or for curator on organization page
  const allMentors = [
    { name: "Юлиана", image: null, id: "1" },
    { name: "Митрофановна", image: null, id: "2" },
  ]

  // TODO: fetch organizations for curator (not on organization page)
  const allOrganizations = [
    { name: "First", id: "1" },
    { name: "Second", id: "2" },
  ]

  const allDirections = [
    { name: "IT-город", id: 1 },
    { name: "Медийный город", id: 2 },
    { name: "Социальный город", id: 3 },
    { name: "HR-город", id: 4 },
    { name: "Комфортная городская среда", id: 5 },
    { name: "Городская экономика", id: 6 },
  ]

  const getNothingText = (role: string) => {
    if (role === "staff") {
      return (
        <>
          Вы еще не создали ни одной вакансии.
          <br />
          Самое время это исправить
        </>
      )
    } else if (role === "mentor") {
      return (
        <>
          Ни одной вакансии, для которой вы назначены наставником, еще нет.
          <br />
          Когда кадровый специалист назначит вас на вакансию, вы увидите это
          здесь
        </>
      )
    } else if (role === "curator") {
      return (
        <>
          На эту стажировку еще не создано
          <br />
          ни одной вакансии
        </>
      )
    }
  }

  const [viewMode, setViewMode] = useState("list")

  const [query, setQuery] = useState("")
  const [statuses, setStatuses] = useState([])
  const [mentors, setMentors] = useState([])
  const [organizations, setOrganizations] = useState([])
  const [currentPage, setCurrentPage] = useState(5)
  const [filters, setFilters] = useState<any>({
    statuses: [],
    organizations: [],
    directions: [],
    mentors: [],
  })

  useEffect(() => console.log("changed"), [filters])

  // TODO
  // if user is mentor - filter vacancies by mentor
  // if user is curator and page is vacancies - find vacancies for curator internship
  // if user is curator and page is organization - filter by organization

  const { data, isLoading } = useQuery({
    queryKey: ["vacancyList", { query, statuses, mentors, page: currentPage }],
    queryFn: () =>
      fetchVacancyList({
        search: query,
        statuses,
        mentors,
        page: currentPage,
      }),
  })

  const clearFilters = () => {
    setQuery("")
    setStatuses([])
    setMentors([])
    setOrganizations([])
  }

  return (
    <div className={styles.container}>
      {!noHeader && (
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Вакансии</h1>
          {user.role === "staff" && (
            <Link href="/staff/add-vacancy">
              <Button>
                <PlusIcon className="icon" />
                <span>Создать вакансию</span>
              </Button>
            </Link>
          )}
        </div>
      )}
      {/* TODO: if there are no vacancies at all */}
      {false ? (
        <div className={styles.nothing}>
          <NothingIcon className={styles.nothingIcon} />
          <p className={styles.nothingText}>{getNothingText(user.role)}</p>
          {user.role === "staff" && (
            <Link href="/staff/add-vacancy">
              <Button>
                <PlusIcon className="icon" />
                <span>Создать вакансию</span>
              </Button>
            </Link>
          )}
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
              {/* TODO: add all statuses */}
              {user.role === "staff" && (
                <Select
                  className={styles.filtersSelect}
                  placeholder="Все статусы"
                  items={[
                    {
                      key: "testTask",
                      value: <VacancyStatus status="testTask" />,
                    },
                    {
                      key: "moderating",
                      value: <VacancyStatus status="moderating" />,
                    },
                    { key: "active", value: <VacancyStatus status="active" /> },
                    {
                      key: "rejected",
                      value: <VacancyStatus status="rejected" />,
                    },
                    {
                      key: "archived",
                      value: <VacancyStatus status="archived" />,
                    },
                  ]}
                  value={statuses}
                  onChange={setStatuses}
                  multiple
                />
              )}
              {/* TODO: if user is staff or (user is curator and page is organization) */}
              {user.role === "staff" && (
                <Select
                  className={styles.filtersSelect}
                  placeholder="Все наставники"
                  items={allMentors.map((i) => ({
                    key: i.id,
                    value: (
                      <div className={styles.filtersMentor}>
                        <img
                          className={styles.filtersMentorImg}
                          src={i.image || userImg}
                        />
                        <p className={styles.filtersMentorName}>{i.name}</p>
                      </div>
                    ),
                  }))}
                  value={mentors}
                  onChange={setMentors}
                  multiple
                />
              )}
              {/* TODO: if user is curator and page is vacancies (not organization) */}
              {user.role === "curator" && (
                <Select
                  className={styles.filtersSelect}
                  placeholder="Все организации"
                  multiple
                  value={organizations}
                  onChange={setOrganizations}
                  items={allOrganizations.map((i) => ({
                    key: i.id,
                    value: i.name,
                  }))}
                />
              )}
            </div>
            {user.role === "intern" && (
              <MobileFilters
                value={filters}
                onChange={setFilters}
                items={[
                  {
                    key: "statuses",
                    title: "Статус вакансии",
                    placeholder: "Все статусы",
                    values: [
                      {
                        key: "active",
                        content: <VacancyStatus status="active" />,
                      },
                      {
                        key: "responsed",
                        content: <VacancyStatus status="responsed" />,
                      },
                      {
                        key: "archived",
                        content: <VacancyStatus status="archived" />,
                      },
                    ],
                  },
                  {
                    key: "organizations",
                    title: "Организация",
                    placeholder: "Все организации",
                    values: allOrganizations.map((i) => ({
                      key: i.id,
                      content: i.name,
                    })),
                    search: true,
                  },
                  {
                    key: "directions",
                    title: "Направление стажировки",
                    placeholder: "Все направления",
                    values: allDirections.map((i) => ({
                      key: i.id,
                      content: i.name,
                    })),
                  },
                  {
                    key: "mentors",
                    title: "Наставник",
                    placeholder: "Все наставники",
                    values: allMentors.map((i) => ({
                      key: i.id,
                      content: (
                        <div className={styles.filtersMentor}>
                          <img
                            className={styles.filtersMentorImg}
                            src={i.image || userImg}
                          />
                          <p className={styles.filtersMentorName}>{i.name}</p>
                        </div>
                      ),
                      searchCheck: (query) =>
                        i.name.toLowerCase().includes(query),
                    })),
                    search: true,
                  },
                ]}
              />
            )}
            {false &&
              (query ||
                !!statuses.length ||
                !!mentors.length ||
                !!organizations.length) && (
                <Button
                  className={styles.filtersClear}
                  type="text"
                  onClick={clearFilters}
                >
                  <TimesIcon className="icon" />
                  <span>Сбросить все</span>
                </Button>
              )}
            {/* TODO: show if user if curator and page is not organization */}
            {(user.role === "curator" || user.role === "intern") && (
              <SmallSwitch
                className={styles.viewSwitch}
                value={viewMode}
                onChange={setViewMode}
                items={[
                  { key: "list", value: <ListIcon className="icon" /> },
                  { key: "map", value: <MapIcon className="icon" /> },
                ]}
              />
            )}
          </div>
          {isLoading ? (
            <Spin />
          ) : (
            <>
              {viewMode === "list" && (
                <>
                  <div className={styles.vacancies}>
                    {data?.items.map((vacancy) => (
                      <VacancyCard
                        key={vacancy.id}
                        vacancy={vacancy}
                        noUser={user.role === "mentor"}
                        link={link}
                      />
                    ))}
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalItems={data?.totalItems ?? 1}
                  />
                </>
              )}
              {viewMode === "map" && (
                <Map items={data?.items}>
                  {(data, props) => (
                    <VacancyMapCard vacancy={data} link={link} {...props} />
                  )}
                </Map>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
