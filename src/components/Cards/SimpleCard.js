import React, { useState } from "react"
import styles from "./SimpleCard.module.scss"
import { Link } from "gatsby"
import Img from "gatsby-image"

export const CardType = {
  jumbo: "jumbo",
  twoSide: "twoSide",
  min: "min",
}

const Card = ({ title, img, content, link }) => {
  const [isMouseOver, setIsMouseOver] = useState("")
  const onMouseOver = () => {
    setIsMouseOver(styles.isMouseOver)
  }
  const onMouseLeave = () => {
    setIsMouseOver("")
  }
  return (
    <Link
      to={`${link}`}
      className={`card ${styles.simpleCard}`}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      title={title}
    >
      <h2 className={styles.simpleCardTitle}> {title}</h2>
      <div className={`${styles.simpleCardImg} ${isMouseOver}`}>
        <Img
          fluid={img.childImageSharp.fluid}
          imgStyle={{ objectFit: "cover", objectPosition: "left top" }}
          style={{ height: "100%" }}
        />
      </div>
    </Link>
  )
}

export default Card
