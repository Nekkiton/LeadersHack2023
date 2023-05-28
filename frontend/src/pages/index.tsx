import Link from "next/link"
import { Spin } from "antd"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { fetchUserInfo } from "data"
import { Role } from "models/Role"

export default function Home() {
  const router = useRouter()

  const { data, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => fetchUserInfo(),
  })

  if (isLoading) return <Spin />

  if (data?.role === Role.STAFF) {
    router.replace("/staff")
  } else if (data?.role === Role.MENTOR) {
    router.replace("/mentor")
  } else if (data?.role === Role.CURATOR) {
    router.replace("/curator")
  } else if (data?.role === Role.INTERN) {
    router.replace("/intern/app")
  } else {
    router.replace("/intern")
  }

  return <Spin />
}
