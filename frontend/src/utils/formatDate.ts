import dayjs from "dayjs"
import "dayjs/locale/ru"

export const formatDate = (date: string, format = "D MMMM YYYY") => {
  return dayjs(date).locale("ru").format(format)
}
