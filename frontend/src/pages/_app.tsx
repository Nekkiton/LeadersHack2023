import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "antd/dist/reset.css"
import "styles/globals.css"
import "assets/css/index.scss"
import AppContainer from "Application/AppContainer"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </QueryClientProvider>
  )
}
