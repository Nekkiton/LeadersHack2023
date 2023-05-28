export enum VacancyStatus {
  created = "created",
  testTask = "testTask",
  moderating = "moderating",
  rejected = "rejected",
  active = "active",
  archived = "archived",
}

export enum CandidateStatus {
  accepted = "accepted",
  moderation = "moderation",
  education = "education",
  tested = "tested",
  hackathon = "hackathon",
  passed = "passed",
  rejected = "rejected",
}

export enum InternshipStage {
  requests = "requests",
  studying = "studying",
  testing = "testing",
  hackathon = "hackathon",
  assignment = "assignment",
  internship1 = "internship1",
  internship2 = "internship2",
  internship3 = "internship3",
}

export interface Period {
  start: string
  end: string
}
