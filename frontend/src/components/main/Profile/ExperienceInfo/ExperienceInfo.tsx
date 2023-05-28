import { useEffect } from "react"
import { Form, Spin } from "antd"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import styles from "./ExperienceInfo.module.scss"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchCandidateExperienceInfo } from "data"

const onFinish = (values: any) => {
  // TODO: add form submit logic here
  console.log("Success experience:", values)
}

export default function Profile() {
  const [isValid, setIsValid] = useState(false)
  const [form] = Form.useForm()
  const formValues = Form.useWatch([], form)

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => setIsValid(true),
      () => setIsValid(false)
    )
  }, [formValues])

  const { data, isLoading } = useQuery({
    queryKey: ["experienceInfo"],
    queryFn: () => fetchCandidateExperienceInfo(),
  })

  if (isLoading) return <Spin />

  return (
    <Form
      className={styles.form}
      initialValues={{ ...data }}
      onFinish={onFinish}
      form={form}
    >
      <div className={styles.main}>
        <div className={`${styles.fields}`}>
          <h3>Образование</h3>
          <Form.Item
            name={["education", "university"]}
            rules={[
              {
                required: true,
                message: "Заполните это поле",
              },
            ]}
          >
            <Input label="Название учебного заведения (ВУЗ или СУЗ)" />
          </Form.Item>
          <Form.Item
            name={["education", "specialty"]}
            rules={[
              {
                required: true,
                message: "Заполните это поле",
              },
            ]}
          >
            <Input label="Факультет" />
          </Form.Item>
          <Form.Item
            name={["education", "graduationYear"]}
            rules={[
              {
                required: true,
                message: "Заполните это поле",
              },
            ]}
          >
            <Input label="Год выпуска" />
          </Form.Item>
        </div>
        <div className={`${styles.fields}`}>
          <h3>Опыт работы и проектной деятельности</h3>
          <Form.Item name="experience">
            <Input
              label="Опыт работы"
              textarea
              notRequired
              postscript="Напишите, когда и где вы работали и какие задачи выполняли. Это повысит ваши шансы на стажировку"
            />
          </Form.Item>
          <Form.Item name="projectActivity">
            <Input
              label="Проектная деятельность"
              notRequired
              textarea
              postscript="Напишите, если у вас был опыт волонтерской или проектной деятельности и что именно вы делали. Это повысит ваши шансы на стажировку"
            />
          </Form.Item>
        </div>
        <div className={styles.footer}>
          <div className={styles.controls}>
            <Button
              className={styles.cancelBtn}
              type="secondary"
              onClick={() => form.resetFields()}
            >
              Отмена
            </Button>
            <Button disabled={!isValid} htmlType="submit">
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </Form>
  )
}
