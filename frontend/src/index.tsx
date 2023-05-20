import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "App"
import MainPage from "pages/Main"
import ErrorPage from "pages/Error"
import Vacancies from "pages/staff/Vacancies"

import { store } from "store"
import "assets/css/index.scss"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <MainPage /> },
      {
        path: "/staff/vacancies",
        element: <Vacancies />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
