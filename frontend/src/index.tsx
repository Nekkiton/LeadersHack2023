import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "App"
import MainPage from "pages/Main"
import ErrorPage from "pages/Error"
import VacanciesPage from "pages/staff/Vacancies"
import NewVacancyPage from "pages/staff/NewVacancy"
import VacancyPage from "pages/staff/Vacancy/Vacancy"

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
        element: <VacanciesPage />,
      },
      {
        path: "/staff/vacancies/new",
        element: <NewVacancyPage />,
      },
      {
        path: "/staff/vacancies/piar-manager",
        element: <VacancyPage />,
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
