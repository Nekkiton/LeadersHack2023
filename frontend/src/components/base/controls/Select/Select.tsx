import { useState, useEffect, ReactNode } from "react"
import Button from "components/base/controls/Button"
import styles from "./Select.module.scss"
import ChevronDownIcon from "assets/icons/chevron-down.svg"
import CheckIcon from "assets/icons/check.svg"

interface Props {
  label?: string
  placeholder?: string
  items?: {
    key: any
    value: ReactNode
    selectedValue?: ReactNode
  }[]
  value?: any[] | any // multiple ? any[] : any
  onChange?: (alue: any) => void
  className?: string
  multiple?: boolean
  same?: boolean
}

export default function Select({
  label,
  same,
  placeholder,
  items = [],
  value,
  onChange,
  className,
  multiple,
}: Props) {
  const [isActive, setIsActive] = useState(false)
  const [newValue, setNewValue] = useState<(string | number)[]>([])

  useEffect(() => {
    if (multiple) setNewValue(value || [])
    else setNewValue(value ? [value] : [])
  }, [value])

  const toggleItem = (key: string | number) => {
    if (multiple) {
      if (newValue.includes(key)) {
        setNewValue([
          ...newValue.slice(0, newValue.indexOf(key)),
          ...newValue.slice(newValue.indexOf(key) + 1, newValue.length),
        ])
      } else {
        setNewValue([...newValue, key])
      }
    } else {
      if (newValue[0] === key) {
        onChange?.(null)
      } else {
        onChange?.(key)
      }
      setIsActive(false)
    }
  }

  const clear = () => {
    if (multiple) {
      setNewValue(value || [])
    }
    setIsActive(false)
  }

  const save = () => {
    onChange?.(newValue)
    setIsActive(false)
  }

  const getHeaderValue = () => {
    if (newValue?.length) {
      if (multiple) {
        return `Выбрано: ${newValue.length}`
      } else {
        const selected = items.find((i) => i.key === newValue[0])
        return selected?.selectedValue || selected?.value
      }
    } else {
      return placeholder
    }
  }

  return (
    <div className={styles.container}>
      {label && <p className={styles.label}>{label}</p>}
      <div
        className={`${styles.select} ${isActive ? styles.active : ""}  ${
          same ? styles.same : ""
        } ${className}`}
      >
        <span className={styles.selectBackdrop} onClick={clear} />
        <div className={styles.selectBody}>
          <div className={styles.selectItems}>
            {items.map((item) => (
              <div
                className={styles.selectItem}
                onClick={() => toggleItem(item.key)}
                key={item.key}
              >
                {item.value}
                {multiple && newValue?.includes(item.key) && (
                  <CheckIcon className={styles.selectItemIcon} />
                )}
              </div>
            ))}
          </div>
          {multiple && (
            <div className={styles.selectControls}>
              <Button type="text" onClick={clear}>
                Сбросить
              </Button>
              <Button onClick={save}>Применить</Button>
            </div>
          )}
        </div>
        <div
          className={`${styles.selectHeader} ${
            newValue.length ? "" : styles.empty
          }`}
          onClick={() => setIsActive((val) => !val)}
        >
          <span>{getHeaderValue()}</span>
          <ChevronDownIcon className={styles.selectHeaderIcon} />
        </div>
      </div>
    </div>
  )
}
