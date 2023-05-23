import Input from "components/base/controls/Input"
import Button from "components/base/controls/Button"
import ResponseCard from "components/base/vacancy/ResponseCard"
import Pagination from "components/base/navigation/Pagination"
import UserQuestionIcon from "assets/icons/user-question.svg"
import SearchIcon from "assets/icons/search.svg"
import styles from "./Candidates.module.scss"

export default function Candidates() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Кандидаты</h1>
      </div>
      {false ? (
        <div className={styles.nothing}>
          <UserQuestionIcon className={styles.nothingIcon} />
          <p>
            На стажировку еще не зарегистрировался
            <br />
            ни один кандидат
          </p>
        </div>
      ) : (
        <>
          <Input
            className={styles.searchInput}
            placeholder="Поиск по кандидатам"
            prefix={<SearchIcon />}
          />
          <div className={styles.sorting}>
            <p>Сортировать по</p>
            <Button type="text">ФИО</Button>
            <Button type="text">количеству баллов</Button>
          </div>
          <div className={styles.candidates}>
            <ResponseCard
              link="/curator/candidates"
              responseInfo={{
                id: "101",
                status: "new",
                name: "Марина Высокова",
                age: "22",
                score: 20,
                address: "г. Москва",
                education: "МГУ им. Ломоносова, выпуск 2023 г.",
                isNew: true,
                reviews: {
                  count: 24,
                  averageRate: 4.7,
                },
                avatar: null
              }}
            />
          </div>
          <Pagination currentPage={1} totalPages={10} setCurrentPage={() => ''}/>
        </>
      )}
    </div>
  )
}
