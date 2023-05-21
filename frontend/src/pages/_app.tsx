import type { AppProps } from "next/app"

import "antd/dist/reset.css"
import "styles/globals.css"
import "assets/css/index.scss"
import AppContainer from "Application/AppContainer"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContainer>
      <Component {...pageProps} />
    </AppContainer>
  )
}
