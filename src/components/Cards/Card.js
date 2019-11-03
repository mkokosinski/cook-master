import React, { useState } from "react"
import PropTypes from "prop-types"
import "./Card.scss"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export const CardType = {
  jumbo: "jumbo",
  twoSide: "twoSide",
  min: "min",
}

const Card = ({ type, title, img, content, link }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "cat.jpg" }) {
        childImageSharp {
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  // const data = useStaticQuery(graphql`
  //     query {
  //       placeholderImage: file(relativePath: { eq: "" }) {
  //         childImageSharp {
  //           fixed(maxWidth: 300) {
  //             ...GatsbyImageSharpfixed
  //           }
  //         }
  //       }
  //     }
  //   `)

  console.log("data", data, img)

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
      <div className={`${type}-card-img`}>
        <Img fixed={data.file.childImageSharp.fixed} />
      </div>
      <div className={`${type}-card-content ${isMouseOver}`}>{content}</div>
      <button
        onClick={() => console.log(link)}
        className={`btn ${type}-card-btn  ${isMouseOver}`}
      >
        Więcej...
      </button>
    </div>
  )
}

Card.propTypes = {
  type: PropTypes.oneOf(Object.keys(CardType)).isRequired,
}

export default Card
