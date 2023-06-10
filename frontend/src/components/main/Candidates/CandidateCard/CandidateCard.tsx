import Link from "next/link"
import UserRating from "components/base/user/UserRating"
import styles from "./CandidateCard.module.scss"
import CandidateStatus from "../CandidateStatus"
import { Candidate } from "models/Candidate"

const userImg = "/images/user.svg"

interface Props {
  link: string
  candidateInfo: Candidate
}

export default function CandidateCard({ link, candidateInfo }: Props) {
  return (
    <Link className={styles.candidate} href={`${link}/${candidateInfo.id}`}>
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
            {/* Need to add rating */}
            <UserRating count={0} averageRate={0} />
          </div>
        </div>
      </div>
      <div className={styles.candidateBlock}>
        <p className={styles.candidateScore}>{candidateInfo.score} баллов</p>
        <p className={styles.candidateText}>
          {candidateInfo.age} года, {candidateInfo.address}
        </p>
        <p className={styles.candidateText}>{candidateInfo.education}</p>
      </div>
    </Link>
  )
}
