export enum ApplicationStatus {
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
    workSchedule: number
    experience: number
    projectActivity: number
    about: number
    training: number
    championship: number
  }
  data: {
    rejectedOn: ApplicationStatus
    rejectionReason: string
  }
}
