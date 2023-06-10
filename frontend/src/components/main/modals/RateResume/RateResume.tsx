import { useState, useEffect } from "react"
import { Form, notification } from "antd"
import Button from "components/base/controls/Button"
import Popup from "components/base/controls/Popup"
import Select from "components/base/controls/Select"
import styles from "./RateResume.module.scss"
import { useMutation } from "@tanstack/react-query"
import { rateCandidateResume } from "data"

interface Props {
  isShowed: boolean
  setIsShowed: (val: boolean) => void
  experience?: string
  projectActivity?: string
  about?: string
  id?: string
}

export default function RateResumeModal({
  isShowed,
  setIsShowed,
  experience,
  projectActivity,
  about,
  id,
}: Props) {
  const [isValid, setIsValid] = useState(false)
  const [form] = Form.useForm()
  const formValues = Form.useWatch([], form)

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => setIsValid(true),
      () => setIsValid(false)
    )
  }, [formValues])

  const rateCandidate = useMutation(rateCandidateResume, {
    onSuccess: () => {
      setIsShowed(false)
      notification.success({
        message: "Ваша оценка сохранена",
      })
    },
  })

  return (
    <Popup
      isShowed={isShowed}
      setIsShowed={setIsShowed}
      title="Оцените резюме кандидата"
    >
      <Form
        className={styles.form}
        form={form}
        onFinish={(values) => {
          console.log("👾 ~ values:", values)
          rateCandidate.mutate({
            id: id ?? "",
            ...values,
          })
        }}
      >
        <div className={styles.block}>
          <h4>Опыт работы</h4>
          <p className={styles.blockText}>{experience ?? "—"}</p>
          <Form.Item
            name="experience"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Select
              label="Начисление баллов"
              placeholder="Выберите из списка"
              items={[
                { key: 0, value: "0 - нет опыта работы" },
                {
                  key: 5,
                  value: "5 - есть нерелевантный опыт работы",
                },
                {
                  key: 10,
                  value: "10 - есть релевантный опыт работы",
                },
              ]}
              same
            />
          </Form.Item>
        </div>
        <div className={styles.block}>
          <h4>Проектная деятельность</h4>
          <p className={styles.blockText}>{projectActivity ?? "—"}</p>
          <Form.Item
            name="projectActivity"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Select
              label="Начисление баллов"
              placeholder="Выберите из списка"
              items={[
                { key: 0, value: "нет опыта проектной деятельности" },
                {
                  key: 5,
                  value: "есть нерелевантный опыт проектной деятельности",
                },
                {
                  key: 10,
                  value: "есть релевантный опыт проектной деятельности",
                },
              ]}
              same
            />
          </Form.Item>
        </div>
        <div className={styles.block}>
          <h4>О себе</h4>
          <p className={styles.blockText}>{about ?? "—"}</p>
          <Form.Item
            name="about"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Select
              label="Начисление баллов"
              placeholder="Выберите из списка"
              items={[
                { key: 0, value: "0 - не заполнено" },
                {
                  key: 5,
                  value:
                    "5 - указана информация о себе, но не указана мотивация для прохождения стажировки",
                },
                {
                  key: 10,
                  value:
                    "10 - указана информация о себе и мотивация к прохождению стажировки",
                },
              ]}
              same
            />
          </Form.Item>
        </div>
        <div className="controls">
          <Button
            className="control desktop"
            type="secondary"
            onClick={() => setIsShowed(false)}
          >
            Отмена
          </Button>
          <Button className="control" htmlType="submit" disabled={!isValid}>
            Оценить
          </Button>
        </div>
      </Form>
    </Popup>
  )
}
