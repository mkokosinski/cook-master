import React from "react"
import styles from "./Step.module.scss"

export const Step = ({ image, desc, step, label }) => {
  return (
    <div className={styles.step}>
      <div className={styles.content}>
        <h2 className={styles.title}>{label}</h2>
        <div className={styles.desc}>{desc}</div>
      </div>
    </div>
  )
}
