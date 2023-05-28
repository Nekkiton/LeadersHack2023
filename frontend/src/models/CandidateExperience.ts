import { InternshipDirection } from "./InternshipDirection"
import { WorkSchedule } from "./WorkSchedule"

export interface CandidateExperience {
  workSchedule: WorkSchedule
  experience: string | null
  projectActivity: string | null
  about: string | null
  education: {
    name: string
    specialty: string
    graduationYear: string
  }
  internshipDirection: InternshipDirection
}
