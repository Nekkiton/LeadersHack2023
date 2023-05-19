import { Outlet } from "react-router-dom"
import { ConfigProvider } from "antd"
import TheHeader from "components/layout/TheHeader"
import TheFooter from "components/layout/TheFooter"
import styles from "./App.module.scss"

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff0f43",
          colorPrimaryHover: "#B30A3F",
          colorBgBase: "#fff",
          colorLink: "#ff0f43",
          colorLinkHover: "#B30A3F",
          colorLinkActive: "#B30A3F",
          borderRadius: 10,
          fontFamily: "Alter Aves",
          lineHeight: 1.3,
          paddingContentHorizontal: 20,
          controlHeight: 45,
          fontSize: 18,
        },
      }}
    >
      <div className={styles.app}>
        <TheHeader />
        <main className={styles.main}>
          <Outlet />
        </main>
        <TheFooter />
      </div>
    </ConfigProvider>
  )
}
