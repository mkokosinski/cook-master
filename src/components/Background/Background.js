import React from "react"
import bg1 from "../../images/bg1.svg"
import bg2 from "../../images/bg2.svg"
import foodbg from "../../images/foodbg.svg"

import styles from "./Background.module.scss"

const Background = ({ children }) => {
  return (
    <div className={styles.parallax}>
      <div className={`${styles.parallax_layer} ${styles.parallax_layerBack}`}>
        <img src={bg2} alt="bg2" />
      </div>
      <div
        className={`${styles.parallax_layer} ${styles.parallax_layerMiddle}`}
      >
        <img src={bg1} alt="bg1" />
      </div>
      <div className={`${styles.parallax_layer} ${styles.parallax_layerFront}`}>
        <img src={foodbg} alt="foodbg" />
      </div>
      {children}
    </div>
  )
}

const Bg1 = () => {
  return <div></div>
}
const Bg2 = () => {
  return <div></div>
}
const Food = () => {
  return <div></div>
}
export default Background
