import { Outlet } from "react-router-dom"
import TheHeader from "components/layout/TheHeader"
import styles from "./App.module.scss"

export default function App() {
  return (
    <div className={styles.app}>
      <TheHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
