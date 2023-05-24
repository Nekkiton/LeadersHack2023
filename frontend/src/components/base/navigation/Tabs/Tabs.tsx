import { ReactNode, useRef, useEffect } from "react"
import styles from "./Tabs.module.scss"

interface Props {
  items: {
    key: string
    value: ReactNode
  }[]
  value?: string
  onChange?: (val: string) => void
}

export default function Tabs({ items, value, onChange }: Props) {
  const tabBgRef = useRef<HTMLSpanElement | null>(null)
  const tabsRef = useRef<HTMLDivElement | null>(null)

  const updateView = () => {
    const idx = items.findIndex((i) => i.key === value)
    const activeTab = tabsRef.current?.children[idx + 1] as HTMLSpanElement

    if (!tabBgRef.current || !activeTab) return

    tabBgRef.current.style.width = `${activeTab.clientWidth}px`
    tabBgRef.current.style.left = `${activeTab.offsetLeft}px`
  }

  useEffect(updateView, [value])

  return (
    <>
      <div className={styles.tabs} ref={tabsRef}>
        <span className={styles.tabBackground} ref={tabBgRef}></span>
        {items.map((item) => (
          <span
            className={`${styles.tab} ${
              item.key === value ? styles.active : ""
            }`}
            key={item.key}
            onClick={() => onChange?.(item.key)}
          >
            {item.value}
          </span>
        ))}
      </div>
    </>
  )
}
