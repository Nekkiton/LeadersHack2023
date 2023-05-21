import Link from "next/link"
import UserRating from "components/base/user/UserRating"
import Select from "components/base/controls/Select"
import styles from "./Responses.module.scss"
import NothingIcon from "assets/icons/document-search.svg"

const userImg = "/images/user.svg"

export default function Responses() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h2>Отклики</h2>
          <span className={styles.headerCount}>8 (+3 новых)</span>
        </div>
        <Select
          className={styles.headerSelect}
          placeholder="Все статусы"
          multiple
        />
      </div>
      {false ? (
        <>
          <NothingIcon className={styles.nothingIcon} />
          <p className={styles.nothingText}>Откликов еще нет</p>
        </>
      ) : (
        <div className={styles.responses}>
          <Link
            className={styles.response}
            href="/staff/vacancies/piar-manager/responses/masha"
          >
            <div className={styles.responseStatus}>
              <span className={styles.responseStatusDot}></span>
              <span>Новый</span>
            </div>
            <div className={styles.responseInfo}>
              <div className={styles.responseUser}>
                <img className={styles.responseUserImg} src={userImg} />
                <div>
                  <p>Марина Высокова</p>
                  <UserRating />
                </div>
              </div>
              <div className={styles.responseUserInfo}>
                <p>22 года, г. Москва</p>
                <p>МГУ им. Ломоносова, выпуск 2023 г.</p>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}
