export enum ApplicationStatus {
  created = "created",
  moderation = "moderation",
  training = "training",
  examination = "examination",
  championship = "championship",
  completed = "completed",
}

export interface InternshipApplication {
  email: string
  status: ApplicationStatus
  score: {
    workSchedule: number | null
    experience: number | null
    projectActivity: number | null
    about: number | null
    examination: number | null
    championship: number | null
  }
  data: {
    rejectedOn: ApplicationStatus
    rejectionReason: string
  }
  internship: {
    year?: string
    applicationStart?: string
    applicationEnd?: string
    trainingStart?: string
    trainingEnd?: string
    trainingLink?: string
    examinationStart?: string
    examinationEnd?: string
    examinationLink?: string
    championshipStart?: string
    championshipEnd?: string
    championshipLink?: string
    distributionStart?: string
    distributionEnd?: string
    sprintOneStart?: string
    sprintOneEnd?: string
    sprintTwoStart?: string
    sprintTwoEnd?: string
    sprintThreeStart?: string
    sprintThreeEnd?: string
  }
}
