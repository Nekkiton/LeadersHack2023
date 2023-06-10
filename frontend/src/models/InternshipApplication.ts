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
}
