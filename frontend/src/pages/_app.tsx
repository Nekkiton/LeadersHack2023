import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConfigProvider } from "antd"
import "antd/dist/reset.css"
import "styles/globals.css"
import "assets/css/index.scss"
import AppContainer from "Application/AppContainer"
import axios, { HttpStatusCode } from "axios"
import router from "next/router"

const queryClient = new QueryClient()

axios.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === HttpStatusCode.MovedPermanently
     && error.response.headers['location']?.includes('/login')) {
      router.replace(error.response.headers['location']);
      throw new axios.Cancel();
  }
  return error.response;
})

export default function App({ Component, pageProps }: AppProps) {

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#2f80ed",
            fontFamily: "GT Walsheim LC",
            colorLink: "#2f80ed",
          },
        }}
      >
        <AppContainer>
          <Component {...pageProps} />
        </AppContainer>
      </ConfigProvider>
    </QueryClientProvider>
  )
}
