import { ApplicationStatus } from "./InternshipApplication"
export interface Candidate {
  user: {
    id: string
    role: string
    email: string
  }
  userProfile: {
    name: string
    surname: string
    patronymic: string
    citizenship: string
    location: string
    phone: string
    photo: string
    birthday: string
    email: string
    role: string
  }
  candidateProfile: {
    workSchedule: string
    experience: string
    projectActivity: string
    about: string
    education: {
      name: string
      specialty: string
      graduationYear: string
    }
    internshipDirection: string
  }
  application: {
    email: string
    internship: {
      year: string
      trainingStart: string
      trainingEnd: string
    }
    score: {
      workSchedule: number | null
      experience: number | null
      projectActivity: number | null
      about: number | null
      training: number | null
      championship: number | null
    }
    status: ApplicationStatus
    data: {
      rejectedOn:	ApplicationStatus
      rejectionReason: string
      rated: null
    }
  }
}
