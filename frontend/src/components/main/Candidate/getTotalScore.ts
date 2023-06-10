
interface Props {
    workSchedule: number | null
    experience: number | null
    projectActivity: number | null
    about: number | null
    training: number | null
    championship: number | null
}

interface Result {
    title: string
    score: number | null
}

export const getTotalScore = (score: Props): number => {
    return Object.values(score).reduce((sum, cur) => sum + cur);
}

export const getDetailScore = (scores: Record<string, number | null>): Result[] => {
    return Object.keys(scores).map((key) => ({ title: key, score: scores[key] }));
}