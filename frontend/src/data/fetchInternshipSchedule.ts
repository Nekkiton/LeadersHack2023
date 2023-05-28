import axios from "axios"
import { InternshipStage, Period } from "./types"

const testData = {
  requests: {
    start: "2023-02-01",
    end: "2023-04-21",
  },
  studying: {
    start: "2023-04-024",
    end: "2023-04-28",
  },
  testing: {
    start: "2023-05-15",
    end: "2023-05-19",
  },
  hackathon: {
    start: "2023-05-28",
    end: "2023-06-02",
  },
  assignment: {
    start: "2023-06-05",
    end: "2023-11-30",
  },
  internship1: {
    start: "2023-08-01",
    end: "2023-09-30",
  },
  internship2: {
    start: "2023-10-01",
    end: "2023-11-30",
  },
  internship3: {
    start: "2023-12-01",
    end: "2024-01-31",
  },
}

type QueryResponse = Record<InternshipStage, Period>

export const fetchInternshipSchedule = async () => {
  return axios
    .get("https://api.publicapis.org/entries")
    .then((res) => testData as QueryResponse)
}
