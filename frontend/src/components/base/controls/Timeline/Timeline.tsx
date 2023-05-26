import React from "react"
import styles from "./Timeline.module.scss"

interface Props {
  itemList: string[]
  itemTitles: Record<string, string>
  activeItem: string
}

export default function Timeline({ itemList, activeItem, itemTitles }: Props) {
  return (
    <div className={styles.timeline}>
      {itemList.map((item, index) => (
        <div
          className={`${styles.timelineItem} ${
            index < itemList.indexOf(activeItem) ? styles.past : ""
          } ${item === activeItem ? styles.active : ""}`}
          key={item}
        >
          <span className={styles.timelineDot}></span>
          <span>{itemTitles[item]}</span>
        </div>
      ))}
    </div>
  )
}
