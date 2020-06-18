import React from "react"
import styles from "./Step.module.scss"
import Img from "gatsby-image"

export const Step = ({ image, desc, step }) => {
  return (
    <div className={styles.step}>

      <div className={styles.content}>
        <h2 className={styles.title}>{`Krok ${step}.`}</h2>
        <div className={styles.desc}>{desc}</div>
      </div>

     
    </div>
  )
}
