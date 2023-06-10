import Button from "components/base/controls/Button"
import styles from "./Pagination.module.scss"
import { Pagination as AntPagination, ConfigProvider } from "antd"

interface Props {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalItems: number
}

export default function Pagination({
  setCurrentPage,
  currentPage,
  totalItems,
}: Props) {
  if (totalItems <= 10) return null

  return (
    <div className={styles.container}>
      <Button className={styles.showMore} type="secondary">
        Показать больше
      </Button>

      <ConfigProvider
        theme={{
          token: {
            colorText: "#6f6f6f",
            colorPrimary: "#fff",
            colorBgContainer: "#6f6f6f",
            fontSize: 16,
            controlHeight: 46,
            borderRadius: 8,
          },
        }}
      >
        <AntPagination
          current={currentPage}
          total={totalItems}
          showSizeChanger={false}
          onChange={setCurrentPage}
          hideOnSinglePage
        />
      </ConfigProvider>
    </div>
  )
}
