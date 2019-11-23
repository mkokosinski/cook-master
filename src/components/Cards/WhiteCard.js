import React, { useState } from "react"
import styles from "./WhiteCard.module.scss"
import {Link } from "gatsby"


const Card = ({ children }) => {
  return (
    <Link to={`${link}`}
      className={`card ${styles.simpleCard}`}
    >
        {children}
      </Link>
  )
}

export default Card
