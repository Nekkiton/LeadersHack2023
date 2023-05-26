import { useState, ReactNode, useEffect } from "react"
import Button from "components/base/controls/Button"
import Popup from "components/base/controls/Popup"
import Input from "components/base/controls/Input"
import Select from "components/base/controls/Select"
import FilterIcon from "assets/icons/filter.svg"
import ChevronRightIcon from "assets/icons/chevron-right.svg"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import CheckIcon from "assets/icons/check.svg"
import SearchIcon from "assets/icons/search.svg"
import TimesIcon from "assets/icons/times.svg"
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
    placeholder?: string
  }[]
  value?: Value
  onChange?: (val: Value) => void
}

export default function MobileFilters({ items, value, onChange }: Props) {
  const [newValue, setNewValue] = useState<Value | null>(null)

  useEffect(() => setNewValue(value || null), [value])

  const [isPopupShowed, setIsPopupShowed] = useState(false)
  const [activeItemIdx, setActiveItemIdx] = useState(-1)
  const [query, setQuery] = useState("")

  const toggleValue = (itemKey: Key, valueKey: Key) => {
    if (!newValue) return

    const changedValue = { ...newValue }

    if (newValue[itemKey].includes(valueKey)) {
      // TODO: why changedValue[itemKey].splice(...) doesn't work
      changedValue[itemKey] = [
        ...changedValue[itemKey].filter((i) => i !== valueKey),
      ]
      setNewValue(changedValue)
    } else {
      // TODO: why changedValue[itemKey].push(...) doesn't work
      changedValue[itemKey] = [...changedValue[itemKey], valueKey]
      setNewValue(changedValue)
    }
  }

  const setValue = (itemKey: Key, itemValue: Key[]) => {
    const changedValue = { ...newValue }
    changedValue[itemKey] = itemValue
    setNewValue(changedValue)
  }

  const closeItem = () => {
    setActiveItemIdx(-1)
    setQuery("")
  }

  const clear = () => {
    const changedValue = { ...newValue }
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

  const filtersExist = (filters?: Value) =>
    filters && Object.values(filters).some((i) => i.length)

  return (
    <div className={styles.container}>
      <div
        className={`${styles.iconContainer} ${
          filtersExist(value) ? styles.mark : ""
        }`}
      >
        <FilterIcon
          className={styles.icon}
          onClick={() => setIsPopupShowed(true)}
        />
      </div>

      <div
        className={`${styles.desktopPopup} ${
          isPopupShowed ? styles.active : ""
        }`}
      >
        <span
          className={styles.desktopPopupBackdrop}
          onClick={() => setIsPopupShowed(false)}
        />
        <div className={styles.desktopPopupContent}>
          {items.map((item) => (
            <Select
              value={value?.[item.key]}
              label={item.title}
              placeholder={item.placeholder}
              items={item.values.map((i) => ({ key: i.key, value: i.content }))}
              onChange={(val) => setValue(item.key, val)}
              multiple
            />
          ))}
          <div className={styles.desktopPopupControls}>
            <Button type="text" onClick={clear}>
              <TimesIcon className="icon" />
              <span>Сбросить</span>
            </Button>
            <Button onClick={submit}>Применить</Button>
          </div>
        </div>
      </div>

      <Popup
        className={styles.mobilePopup}
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
                    {newValue?.[items[activeItemIdx].key].includes(
                      item.key
                    ) && <CheckIcon className={styles.popupItemIcon} />}
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
