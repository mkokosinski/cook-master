import React, { useEffect } from "react"
import { useLax, useLaxElement } from 'use-lax'

import styles from "./Background.module.scss"

import bg1 from "../../images/bg1.svg"
import bg2 from "../../images/bg2.svg"
import foodbg from "../../images/foodbg.svg"


const Background = ({ children }) => {
  useLax()
  const layer1 = useLaxElement()
  const layer2 = useLaxElement()
  const layer3 = useLaxElement()
  return (
    <div className={styles.parallax}>
      {console.log('render')}
      <div className={`${styles.parallax_layer} ${styles.parallax_layerBack} lax`}  ref={layer1} data-lax-translate-y="0 0, 500 -50">
        <img src={bg2} alt="bg2" />
      </div>
      <div
        className={`${styles.parallax_layer} ${styles.parallax_layerMiddle} lax`} ref={layer2} data-lax-translate-y="0 0, 500 -200"
      >
        <img src={bg1} alt="bg1" />
      </div>
      <div className={`${styles.parallax_layer} ${styles.parallax_layerFront} lax`} ref={layer3} data-lax-translate-y="0 0, 500 -300">
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
