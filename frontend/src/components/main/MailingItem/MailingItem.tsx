import Link from "next/link"
import { useRouter } from "next/router"
import Button from "components/base/controls/Button"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import PenIcon from "assets/icons/pen.svg"
import CopyIcon from "assets/icons/copy.svg"
import styles from "./MailingItem.module.scss"

interface Props {
  backLink: string
}

export default function MailingItem({ backLink }: Props) {
  const router = useRouter()

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
          Тестирование кандидатов пройдет с 10 по 17 мая
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
            <p>Тестирование кандидатов пройдет с 10 по 17 мая</p>
          </div>
          <div className={styles.cardBlock}>
            <p className={styles.cardTitle}>Текст</p>
            <p>
              Для современного мира высокое качество позиционных исследований
              прекрасно подходит для реализации поставленных обществом задач.
              Безусловно, существующая теория способствует повышению качества
              экспериментов, поражающих по своей масштабности и грандиозности.
              Господа.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardBlock}>
            <p className={styles.cardTitle}>Дата отправки</p>
            <p>17 июня 2023 в 12:00</p>
          </div>
          <div className={styles.cardBlock}>
            <p className={styles.cardTitle}>Тип</p>
            <p>e-mail, push</p>
          </div>
          <div className={styles.cardBlock}>
            <p className={styles.cardTitle}>Получатели</p>
            <p>Стажеры, наставники, кадровые специалисты</p>
          </div>
        </div>
      </div>
    </div>
  )
}
