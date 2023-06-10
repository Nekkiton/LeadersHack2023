import Link from "next/link"
import UserRating from "components/base/user/UserRating"
import styles from "./CandidateCard.module.scss"
import CandidateStatus from "../CandidateStatus"
import { Candidate } from "models/Candidate"
import { calculateTotal } from "utils/calculateTotal"
import dayjs from "dayjs"

const userImg = "/images/user.svg"

interface Props {
  link: string
  candidateInfo: Candidate
}

export default function CandidateCard({ link, candidateInfo }: Props) {
  return (
    <Link
      className={styles.candidate}
      href={`${link}/${candidateInfo.user.id}`}
    >
      <div className={styles.candidateBlock}>
        <CandidateStatus
          className={styles.candidateStatus}
          status={candidateInfo.application.status}
        />

        <div className={styles.candidateUser}>
          <img
            className={styles.candidateUserImg}
            src={candidateInfo.userProfile.photo ?? userImg}
          />
          <div>
            <p>{`${candidateInfo.userProfile.name} ${candidateInfo.userProfile.surname}`}</p>
            {/* TODO: Need to add rating */}
            <UserRating count={0} averageRate={0} />
          </div>
        </div>
      </div>
      <div className={styles.candidateBlock}>
        <p className={styles.candidateScore}>
          {calculateTotal(candidateInfo.application.score)} баллов
        </p>
        <p className={styles.candidateText}>
          {dayjs().diff(candidateInfo.userProfile.birthday, "years")} года,{" "}
          {candidateInfo.userProfile.location}
        </p>
        <p className={styles.candidateText}>
          {candidateInfo.candidateProfile.education.name}, выпуск{" "}
          {candidateInfo.candidateProfile.education.graduationYear} г.
        </p>
      </div>
    </Link>
  )
}
