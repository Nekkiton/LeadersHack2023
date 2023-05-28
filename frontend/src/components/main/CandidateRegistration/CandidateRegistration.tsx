import { useState, useEffect } from "react"
import Link from "next/link"
import { Form } from "antd"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import Checkbox from "components/base/controls/Checkbox"
import Radio from "components/base/controls/Radio"
import Select from "components/base/controls/Select"
import ImageUpload from "components/base/controls/ImageUpload"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import UploadIcon from "assets/icons/upload.svg"
import MailSentIcon from "assets/icons/mail-sent.svg"
import ExclamationIcon from "assets/icons/exclamation.svg"
import styles from "./CandidateRegistration.module.scss"

const userImg = "/images/user.svg"

export default function CandidateRegistration() {
  const steps = ["Личные данные", "Опыт", "Мотивация"]
  const [activeStep, setActiveStep] = useState(1)
  const [isFinished, setIsFinished] = useState(false)

  const [isValid, setIsValid] = useState(false)
  const [form] = Form.useForm()
  const formValues = Form.useWatch([], form)

  const [avatarUrl, setAvatarUrl] = useState("")

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => setIsValid(true),
      () => setIsValid(false)
    )
  }, [formValues, activeStep])

  // TODO: save data, handle errors
  const onFinish = (data: any) => {
    console.log(data)
    setIsFinished(true)
  }

  if (isFinished)
    return (
      <div className={styles.finished}>
        <MailSentIcon className={styles.finishedIcon} />
        <div className={styles.finishedTextContainer}>
          <h2>Анкета отправлена</h2>
          <p className={styles.finishedText}>
            Поздравляем! Ты стал на шаг ближе к стажировке. Статус анкеты и
            дальнейшие действия отслеживай в личном кабинете. Удачи в отборе!
          </p>
        </div>
        <Link href="/profile">
          <Button className={styles.finishedBtn}>
            Перейти в личный кабинет
          </Button>
        </Link>
      </div>
    )

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/intern">
          <Button type="text">
            <ChevronLeftIcon className="icon" />
            <span>Вернуться на главную</span>
          </Button>
        </Link>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Анкета кандидата</h1>
          <p className={styles.titleHint}>
            Шаг {activeStep} из 3. {steps[activeStep]}
          </p>
        </div>
      </div>
      <div className={styles.main}>
        <Form
          className={styles.form}
          form={form}
          onFinish={onFinish}
          initialValues={{ hours: 20 }}
        >
          <div
            className={`${styles.formStep} ${
              activeStep === 1 ? styles.active : ""
            }`}
          >
            <div className={styles.formStepBlock}>
              <p className={styles.formStepBlockTitle}>Основная информация</p>
              <div className={styles.formImgContainer}>
                <img className={styles.formImg} src={avatarUrl || userImg} />
                <Form.Item name="avatar">
                  <ImageUpload setImgUrl={setAvatarUrl}>
                    <Button type="text">
                      <UploadIcon className="icon" />
                      <span>Добавить фото</span>
                    </Button>
                  </ImageUpload>
                </Form.Item>
              </div>
              <div className={styles.formHFields}>
                <Form.Item
                  className={styles.formField}
                  name="surname"
                  rules={[{ required: true, message: "Заполните это поле" }]}
                >
                  <Input label="Фамилия" />
                </Form.Item>
                <Form.Item
                  className={styles.formField}
                  name="name"
                  rules={[{ required: true, message: "Заполните это поле" }]}
                >
                  <Input label="Имя" />
                </Form.Item>
                <Form.Item className={styles.formField} name="patronymic">
                  <Input label="Отчество" notRequired />
                </Form.Item>
              </div>
              <div className={styles.formHFields}>
                <Form.Item
                  className={styles.formField}
                  name="birthdate"
                  rules={[{ required: true, message: "Заполните это поле" }]}
                >
                  <Input label="Дата рождения" datepicker />
                </Form.Item>
                <Form.Item
                  name="citizenship"
                  className={styles.formField}
                  rules={[{ required: true, message: "Заполните это поле" }]}
                >
                  <Input label="Гражданство" />
                </Form.Item>
              </div>
              <Form.Item
                name="town"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Место жительства" />
              </Form.Item>
            </div>
            <div className={styles.formStepBlock}>
              <p className={styles.formStepBlockTitle}>Контактная информация</p>
              <Form.Item
                name="phone"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Input label="Телефон" />
              </Form.Item>
            </div>
          </div>

          <div
            className={`${styles.formStep} ${
              activeStep === 2 ? styles.active : ""
            }`}
          >
            <div className={styles.formStepBlock}>
              <p className={styles.formStepBlockTitle}>Образование</p>
              <Form.Item
                name="university"
                rules={[
                  { required: activeStep >= 2, message: "Заполните это поле" },
                ]}
              >
                <Input label="Название учебного заведения (ВУЗ или СУЗ)" />
              </Form.Item>
              <Form.Item
                name="faculty"
                rules={[
                  { required: activeStep >= 2, message: "Заполните это поле" },
                ]}
              >
                <Input label="Факультет" />
              </Form.Item>
              <Form.Item
                name="year"
                rules={[
                  { required: activeStep >= 2, message: "Заполните это поле" },
                ]}
              >
                <Input label="Год выпуска" />
              </Form.Item>
            </div>
            <div className={styles.formStepBlock}>
              <p className={styles.formStepBlockTitle}>
                Опыт работы и проектной деятельности
              </p>
              <Form.Item name="workExp">
                <Input
                  label="Опыт работы"
                  notRequired
                  textarea
                  postscript="Напишите, когда и где вы работали и какие задачи выполняли. Это повысит ваши шансы на стажировку"
                />
              </Form.Item>
              <Form.Item name="projects">
                <Input
                  label="Проектная деятельность"
                  textarea
                  notRequired
                  postscript="Напишите, если у вас был опыт волонтерской или проектной деятельности и что именно вы делали. Это повысит ваши шансы на стажировку"
                />
              </Form.Item>
            </div>
          </div>

          <div
            className={`${styles.formStep} ${
              activeStep === 3 ? styles.active : ""
            }`}
          >
            <div className={styles.formStepBlock}>
              <Form.Item
                name="hours"
                rules={[
                  {
                    required: activeStep >= 3,
                    message: "Заполните это поле",
                  },
                ]}
              >
                <Radio
                  label="Сколько часов вы готовы уделять стажировке?"
                  items={[
                    { value: 20, content: "20 часов в неделю (4 часа в день)" },
                    {
                      value: 40,
                      content: "40 часов в неделю (8 часов в день)",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="direction"
                rules={[
                  { required: activeStep >= 3, message: "Заполните это поле" },
                ]}
              >
                <Select
                  label="Желаемое направление стажировки"
                  placeholder="Выберите из списка"
                  same
                  items={[
                    { key: "it", value: "IT-город" },
                    { key: "media", value: "Медийный город" },
                    { key: "social", value: "Социальный город" },
                    { key: "hr", value: "HR-город" },
                    { key: "town", value: "Комфортная городская среда" },
                    { key: "economy", value: "Городская экономика" },
                  ]}
                />
              </Form.Item>
              <Form.Item name="about">
                <Input
                  label="О себе"
                  notRequired
                  textarea
                  postscript="Напишите, зачем вы хотите попасть на стажировку и почему именно вы должны стажироваться в Правительстве Москвы. Это повысит ваши шансы"
                />
              </Form.Item>
              <Form.Item
                name="rules"
                rules={[
                  {
                    required: activeStep >= 3,
                    message: "Заполните это поле",
                  },
                ]}
              >
                <Checkbox
                  items={[
                    {
                      value: "yes",
                      content: (
                        <div className={styles.formCheckbox}>
                          Даю согласие на {/* TODO: add link */}
                          <span className={styles.formCheckboxLink}>
                            обработку персональных данных
                          </span>
                        </div>
                      ),
                    },
                  ]}
                />
              </Form.Item>
            </div>
          </div>

          <div className={styles.formControls}>
            {activeStep > 1 && (
              <Button
                className={styles.formControl}
                type="secondary"
                onClick={() => setActiveStep((prev) => prev - 1)}
              >
                ← Назад
              </Button>
            )}
            {activeStep < 3 && (
              <Button
                className={styles.formControl}
                disabled={!isValid}
                onClick={() => setActiveStep((prev) => prev + 1)}
              >
                Далее →
              </Button>
            )}
            {activeStep === 3 && (
              <Button
                className={styles.formControl}
                disabled={!isValid}
                htmlType="submit"
              >
                Отправить
              </Button>
            )}
          </div>
        </Form>
        <div className={`${styles.hint} ${styles.desktop}`}>
          <ExclamationIcon className={styles.hintIcon} />
          <p>
            После отправки анкеты введенные данные будут сохранены в профиле
          </p>
        </div>
      </div>
    </div>
  )
}
