import { Form } from "antd"
import Button from "components/base/controls/Button"
import Input from "components/base/controls/Input"
import PenIcon from "assets/icons/pen.svg"
import styles from "./Profile.module.scss"

const userImg = "/images/user.svg"

export default function Profile() {
  return (
    <Form className={styles.container}>
      <div className={styles.userImgContainer}>
        <img className={styles.userImg} src={userImg} />
        <div className={styles.userImgBtn}>
          <PenIcon />
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.fields}>
          <h3>Основная информация</h3>
          <div className={styles.hFields}>
            <Form.Item name="name">
              <Input label="Имя" />
            </Form.Item>
            <Form.Item name="patronymic">
              <Input label="Отчество" />
            </Form.Item>
            <Form.Item name="surname">
              <Input label="Фамилия" />
            </Form.Item>
          </div>
          <div className={styles.hFields}>
            <div className={styles.field}>
              <Form.Item name="birthdate">
                <Input label="Дата рождения" datepicker />
              </Form.Item>
            </div>
            <div className={styles.field}>
              <Form.Item name="citizenship">
                <Input className={styles.field} label="Гражданство" />
              </Form.Item>
            </div>
          </div>
          <Input label="Место жительства" />
        </div>
        <div className={styles.fields}>
          <h3>Контактная информация</h3>
          <div className={styles.hFields}>
            <div className={styles.field}>
              <Form.Item name="phone">
                <Input label="Телефон" />
              </Form.Item>
            </div>
            <div className={styles.field}>
              <Form.Item name="email">
                <Input label="Эл. почта" />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.controls}>
            <Button type="secondary">Отмена</Button>
            <Button>Сохранить</Button>
          </div>
          <Button type="text">Изменить пароль</Button>
        </div>
      </div>
    </Form>
  )
}
