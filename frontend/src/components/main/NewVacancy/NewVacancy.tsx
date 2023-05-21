import { useEffect, useState } from "react"
import { Form } from "antd"
import Link from "next/link"
import Button from "components/base/controls/Button"
import Select from "components/base/controls/Select"
import Modal from "components/base/controls/Modal"
import Input from "components/base/controls/Input"
import styles from "./NewVacancy.module.scss"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import ExclamationIcon from "assets/icons/exclamation.svg"
import LinkExternalIcon from "assets/icons/link-external.svg"
import TimesIcon from "assets/icons/times.svg"

const userImg = "/images/user.svg"

export default function NewVacancy() {
  const [isValid, setIsValid] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const formValues = Form.useWatch([], form)

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => setIsValid(true),
      () => setIsValid(false)
    )
  }, [formValues])

  return (
    <div className={styles.container}>
      {/* TODO: onOk should remove vacancy */}
      <Modal
        isOpen={isModalOpen}
        title="Вы уверены, что хотите удалить вакансию?"
        onCancel={toggleModal}
        onOk={toggleModal}
        okText="Удалить"
      />
      <Link href="/staff/vacancies">
        <Button className={styles.navBtn} type="text">
          <ChevronLeftIcon className="icon" />
          <span>Вернуться к вакансиям</span>
        </Button>
      </Link>
      <h1 className={styles.title}>Создать вакансию</h1>
      <div className={styles.content}>
        <Form className={styles.form} form={form}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input placeholder="Укажите название должности" label="Название" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              placeholder="Опишите задачи, которые нужно будет выполнять стажеру"
              label="Описание"
              textarea
            />
          </Form.Item>
          <Form.Item
            name="division"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Select
              placeholder="Выберите из списка"
              label="Подразделение"
              items={{
                1: "Бухгалтерия",
                2: "Отдел закупок",
                3: "Пресс-центр",
              }}
              same
            />
          </Form.Item>
          <div className={styles.formHFields}>
            <Form.Item
              name="dates"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Select
                placeholder="Выберите из списка"
                label="Даты стажировки"
                items={{
                  1: "1 августа - 30 сентября",
                  2: "1 октября - 30 ноября",
                }}
                same
              />
            </Form.Item>
            <Form.Item
              name="mentor"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Select
                placeholder="Выберите из списка"
                label="Наставник"
                items={{
                  1: {
                    value: (
                      <div className={styles.formMentor}>
                        <img className={styles.formMentorImg} src={userImg} />
                        <p className={styles.formMentorName}>
                          Юлиана Митрофанова
                        </p>
                      </div>
                    ),
                    selectedValue: "Юлиана Митрофанова",
                  },
                }}
                same
              />
            </Form.Item>
          </div>
          <div className={styles.formControls}>
            <Form.Item>
              <Button htmlType="submit" disabled={!isValid}>
                Создать
              </Button>
            </Form.Item>
            {true && (
              <Button
                className={styles.formDeleteBtn}
                type="text"
                onClick={toggleModal}
              >
                <TimesIcon className="icon" />
                <span>Удалить вакансию</span>
              </Button>
            )}
          </div>
        </Form>
        <div className={styles.hint}>
          <ExclamationIcon className={styles.hintIcon} />
          <p className={styles.hintText}>
            После создания вакансия появится у выбранного наставника в личном
            кабинете. Он должен будет добавить тестовое задание. Если вакансия
            не подразумевает тестового задания, наставник может пропустить этот
            шаг.
          </p>
          <p className={styles.hintText}>
            Актуальный статус вакансии вы сможете увидеть в личном кабинете
          </p>
          <Button type="text">
            <span>Подробнее о создании вакансий</span>
            <LinkExternalIcon className="icon" />
          </Button>
        </div>
      </div>
    </div>
  )
}
