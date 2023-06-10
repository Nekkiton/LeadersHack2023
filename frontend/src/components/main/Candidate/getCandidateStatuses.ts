import { ApplicationStatus } from "models/InternshipApplication"

export const statusTitles: Record<ApplicationStatus, string> = {
  [ApplicationStatus.created]: "Заявка принята",
  [ApplicationStatus.moderation]: "На модерации",
  [ApplicationStatus.examination]: "Проходит обучение",
  [ApplicationStatus.training]: "Прошел тестирование",
  [ApplicationStatus.championship]: "Проходит кейс-чемпионат",
  [ApplicationStatus.completed]: "Отобран на стажировку",
  [ApplicationStatus.rejected]: "Отклонен",
}

const baseStatusList = [
  ApplicationStatus.created,
  ApplicationStatus.moderation,
  ApplicationStatus.training,
  ApplicationStatus.championship,
  ApplicationStatus.completed,
  ApplicationStatus.rejected
]

export const getCandidateStatuses = (
  activeStatus: ApplicationStatus,
  previousStatus: ApplicationStatus
) => {
  if (activeStatus === ApplicationStatus.rejected) {
    const statusBeforeRejecting = baseStatusList.indexOf(previousStatus)

    const statusList = baseStatusList.slice(0, statusBeforeRejecting + 1)
    statusList.push(ApplicationStatus.rejected)

    return statusList
  }

  return baseStatusList
}
