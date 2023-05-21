import TheHeader from "components/layout/TheHeader"
import styles from "./AppContainer.module.scss"
import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {}

export default function AppContainer({ children }: Props) {
  return (
    <div className={styles.app}>
      <TheHeader />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
