import { useState, useEffect } from "react"
import Button from "components/base/controls/Button"
import styles from "./Select.module.scss"
import { ReactComponent as ChevronDownIcon } from "assets/icons/chevron-down.svg"
import { ReactComponent as CheckIcon } from "assets/icons/check.svg"

interface Props {
  placeholder?: string
  items?: {
    [key: string | number]: any
  }
  value?: any[]
  onChange?: (alue: any) => void
}

export default function Select({
  placeholder,
  items = {},
  value,
  onChange,
}: Props) {
  const [isActive, setIsActive] = useState(false)
  const [newValue, setNewValue] = useState<(string | number)[]>([])

  useEffect(() => setNewValue(value || []), [value])

  const toggleItem = (key: string | number) => {
    if (newValue.includes(key)) {
      setNewValue([
        ...newValue.slice(0, newValue.indexOf(key)),
        ...newValue.slice(newValue.indexOf(key) + 1, newValue.length),
      ])
    } else {
      setNewValue([...newValue, key])
    }
  }

  const clear = () => {
    setNewValue(value || [])
    setIsActive(false)
  }

  const save = () => {
    onChange?.(newValue)
    setIsActive(false)
  }

  return (
    <div className={`${styles.select} ${isActive ? styles.active : ""}`}>
      <span className={styles.selectBackdrop} onClick={clear} />
      <div
        className={`${styles.selectHeader} ${
          newValue?.length ? "" : styles.empty
        }`}
        onClick={() => setIsActive((val) => !val)}
      >
        <span>
          {newValue?.length ? `Выбрано: ${newValue.length}` : placeholder}
        </span>{" "}
        <ChevronDownIcon className={styles.selectHeaderIcon} />
      </div>
      <div className={styles.selectBody}>
        <div className={styles.selectItems}>
          {Object.keys(items).map((key) => (
            <div
              className={styles.selectItem}
              onClick={() => toggleItem(key)}
              key={key}
            >
              {items[key]}
              {newValue?.includes(key) && <CheckIcon />}
            </div>
          ))}
        </div>
        <div className={styles.selectControls}>
          <Button type="text" onClick={clear}>
            Сбросить
          </Button>
          <Button onClick={save}>Применить</Button>
        </div>
      </div>
    </div>
  )
}
