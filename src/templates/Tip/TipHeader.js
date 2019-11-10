import React from "react"
import styles from "./TipHeader.module.scss"
import Img from "gatsby-image"

const Header = ({ img, title }) => (
  <div className={styles.header}>
    <Img fluid={img.childImageSharp.fluid} />
    <h1>{title}</h1>
  </div>
)

export default Header
