import Link from "next/link"
import { useRouter } from "next/router"
import Button from "components/base/controls/Button"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import PenIcon from "assets/icons/pen.svg"
import CopyIcon from "assets/icons/copy.svg"
import styles from "./MailingItem.module.scss"
import { useQuery } from "@tanstack/react-query"
import { fetchMailingItem } from "data"
import { Spin } from "antd"
import dayjs from "dayjs"
import "dayjs/locale/ru";

interface Props {
  backLink: string
  mailId: string
}

export default function MailingItem({ backLink, mailId }: Props) {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["mailingItem", { id: mailId }],
    queryFn: () =>
      fetchMailingItem({
        id: mailId ?? "",
      }),
  })

  if (!data || isLoading) return <Spin />

  return (
    <div className={styles.container}>
      <Link className={styles.backLink} href={backLink}>
        <Button type="text">
          <ChevronLeftIcon className="icon" />
          <span>Вернуться к рассылкам</span>
        </Button>
      </Link>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {data.title}
        </h1>
        <div className={styles.headerControls}>
          {/* TODO: modals */}
          <Link href={`/curator/add-mailing?copy=${router.query.id}`}>
            <Button type="text">
              <CopyIcon className="icon" />
              <span>Создать копию</span>
            </Button>
          </Link>
          {/* TODO: if mailing is in past */}
          {true && (
            <Link href={`/curator/mailing/${router.query.id}/edit`}>
              <Button type="secondary">
                <PenIcon className="icon" />
                <span>Редактировать</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardBlock}>
            <p className={styles.cardTitle}>Тема</p>
            <p>{data.title}</p>
          </div>
          <div className={styles.cardBlock}>
            <p className={styles.cardTitle}>Текст</p>
            <p>{data.body}</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardBlock}>
            <p className={styles.cardTitle}>Дата отправки</p>
            <p>{dayjs(data.date).locale("ru").format('D MMMM YYYY в hh:mm')}</p>
          </div>
          <div className={styles.cardBlock}>
            <p className={styles.cardTitle}>Тип</p>
            <p>{data.type.join(", ")}</p>
          </div>
          <div className={styles.cardBlock}>
            <p className={styles.cardTitle}>Получатели</p>
            <p>{data.recepient_roles.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
