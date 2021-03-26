import React, { useState } from "react"
import PropTypes from "prop-types"
import "./Card.scss"
import Img from "gatsby-image"
import { Link } from "gatsby"

export const CardType = {
  jumbo: "jumbo",
  twoSide: "twoSide",
  min: "min",
  simple: "simple",
}

const Card = ({ type, title, img, content, link }) => {
  const [isMouseOver, setIsMouseOver] = useState("")
  const onMouseOver = () => {
    setIsMouseOver("is-mouse-over")
  }
  const onMouseLeave = () => {
    setIsMouseOver("")
  }

  return (
    <div
      className={`card ${type}-card`}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <h2 className={`${type}-card-title`}> {title}</h2>
      <div className={`${type}-card-img ${isMouseOver}`}>
        <Img
          fluid={img.childImageSharp.fluid}
          imgStyle={{ objectFit: "cover" }}
          style={{ height: "100%" }}
        />
      </div>
      <div className={`${type}-card-content ${isMouseOver}`}>{content}</div>
      <Link to={`${link}`}>
        <button className={`btn ${type}-card-btn  ${isMouseOver}`}>
          {" "}
          Więcej...
        </button>
      </Link>
    </div>
  )
}

Card.propTypes = {
  type: PropTypes.oneOf(Object.keys(CardType)).isRequired,
}

export default Card
