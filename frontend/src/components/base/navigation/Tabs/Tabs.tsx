import { ReactNode, useState, useRef, useEffect } from "react"
import styles from "./Tabs.module.scss"

interface Props {
  items: {
    title: string
    content: ReactNode
  }[]
  defaultTab: number
}

export default function Tabs({ items, defaultTab }: Props) {
  const [activeTabIdx, setActiveTabIdx] = useState(defaultTab)

  const tabBgRef = useRef<HTMLSpanElement | null>(null)
  const tabsRef = useRef<HTMLDivElement | null>(null)

  const updateView = () => {
    console.log(tabsRef.current)

    const activeTab = tabsRef.current?.children[
      activeTabIdx + 1
    ] as HTMLSpanElement

    if (!tabBgRef.current || !activeTab) return

    tabBgRef.current.style.width = `${activeTab.clientWidth}px`
    tabBgRef.current.style.left = `${activeTab.offsetLeft}px`
  }

  useEffect(updateView, [activeTabIdx])

  return (
    <>
      <div className={styles.tabs} ref={tabsRef}>
        <span className={styles.tabBackground} ref={tabBgRef}></span>
        {items.map((item, idx) => (
          <span
            className={`${styles.tab} ${
              idx === activeTabIdx ? styles.active : ""
            }`}
            key={item.title + idx}
            onClick={() => setActiveTabIdx(idx)}
          >
            {item.title}
          </span>
        ))}
      </div>
      {items[activeTabIdx].content}
    </>
  )
}
