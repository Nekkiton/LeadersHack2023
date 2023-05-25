import { useState, ReactNode, useEffect } from "react"
import Button from "components/base/controls/Button"
import Popup from "components/base/controls/Popup"
import Input from "components/base/controls/Input"
import FilterIcon from "assets/icons/filter.svg"
import ChevronRightIcon from "assets/icons/chevron-right.svg"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import CheckIcon from "assets/icons/check.svg"
import SearchIcon from "assets/icons/search.svg"
import styles from "./MobileFilters.module.scss"

type Key = string | number

interface Value {
  [key: Key]: Key[]
}

interface Props {
  items: {
    title: string
    key: Key
    values: {
      key: Key
      content: ReactNode
      searchCheck?: (query: string) => boolean
    }[]
    search?: boolean
  }[]
  value?: Value
  onChange?: (val: Value) => void
}

// TODO: fix changing
export default function MobileFilters({ items, value, onChange }: Props) {
  const [newValue, setNewValue] = useState<Value | null>(null)

  useEffect(() => setNewValue(value || null), [value])

  const [isPopupShowed, setIsPopupShowed] = useState(false)
  const [activeItemIdx, setActiveItemIdx] = useState(-1)
  const [query, setQuery] = useState("")

  const toggleValue = (itemKey: Key, valueKey: Key) => {
    if (!newValue) return

    const changedValue = Object.assign({}, newValue)

    if (newValue[itemKey].includes(valueKey)) {
      changedValue[itemKey].splice(newValue[itemKey].indexOf(valueKey), 1)
      setNewValue(changedValue)
    } else {
      changedValue[itemKey].push(valueKey)
      setNewValue(changedValue)
    }
  }

  const closeItem = () => {
    setActiveItemIdx(-1)
    setQuery("")
  }

  const clear = () => {
    const changedValue = Object.assign({}, newValue)
    for (const key in changedValue) {
      changedValue[key] = []
    }
    onChange?.(changedValue)
    setIsPopupShowed(false)
    closeItem()
  }

  const close = () => {
    setNewValue(value || null)
    setIsPopupShowed(false)
    closeItem()
  }

  const submit = () => {
    newValue && onChange?.(newValue)
    setIsPopupShowed(false)
    closeItem()
  }

  return (
    <div className={styles.container}>
      <FilterIcon
        className={`${styles.icon} ${styles.mark}`}
        onClick={() => setIsPopupShowed(true)}
      />
      <Popup
        title={
          activeItemIdx >= 0 ? (
            <div className={styles.popupHeader}>
              <ChevronLeftIcon
                className={styles.popupHeaderIcon}
                onClick={closeItem}
              />
              <span>{items[activeItemIdx].title}</span>
            </div>
          ) : (
            "Фильтр по вакансиям"
          )
        }
        isShowed={isPopupShowed}
        setIsShowed={setIsPopupShowed}
        onClose={close}
      >
        {activeItemIdx >= 0 && items[activeItemIdx].search && (
          <Input
            prefix={<SearchIcon />}
            placeholder="Поиск"
            value={query}
            onChange={setQuery}
          />
        )}
        {activeItemIdx >= 0 ? (
          <div className={styles.popupItems}>
            {items[activeItemIdx].values.map(
              (item) =>
                (!query ||
                  (item.searchCheck
                    ? item.searchCheck(query.toLowerCase())
                    : item.content
                        ?.toString()
                        .toLowerCase()
                        .includes(query.toLowerCase()))) && (
                  <div
                    className={styles.popupItem}
                    key={item.key}
                    onClick={() =>
                      toggleValue(items[activeItemIdx].key, item.key)
                    }
                  >
                    <div>{item.content}</div>
                    {value?.[items[activeItemIdx].key].includes(item.key) && (
                      <CheckIcon className={styles.popupItemIcon} />
                    )}
                  </div>
                )
            )}
          </div>
        ) : (
          <div className={styles.popupItems}>
            {items.map((item, idx) => (
              <div
                className={styles.popupItem}
                key={item.key}
                onClick={() => setActiveItemIdx(idx)}
              >
                <div>{item.title}</div>
                <ChevronRightIcon className={styles.popupItemIcon} />
              </div>
            ))}
          </div>
        )}
        <div className={styles.popupControls}>
          <Button type="secondary" onClick={clear}>
            Сбросить
          </Button>
          <Button onClick={submit}>Применить</Button>
        </div>
      </Popup>
    </div>
  )
}
