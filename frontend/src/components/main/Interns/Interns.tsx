import Input from "components/base/controls/Input"
import ResponseCard from "components/base/vacancy/ResponseCard"
import Pagination from "components/base/navigation/Pagination"
import StudentIcon from "assets/icons/student.svg"
import SearchIcon from "assets/icons/search.svg"
import styles from "./Interns.module.scss"

interface Props {
  link: string
}

export default function Interns({ link }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Стажеры</h1>
      </div>
      {false ? (
        <div className={styles.nothing}>
          <StudentIcon className={styles.nothingIcon} />
          <p>У вас еще нет стажеров на наставничестве</p>
        </div>
      ) : (
        <>
          <Input
            className={styles.searchInput}
            placeholder="Поиск по стажерам"
            prefix={<SearchIcon />}
          />
          <div className={styles.interns}>
            <ResponseCard
              link={link}
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
