import React, { useState } from "react"
import PropTypes from "prop-types"
import "./Card.scss"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

export const CardType = {
  jumbo: "jumbo",
  twoSide: "twoSide",
  min: "min",
  simple: "simple",
}

const Card = ({ type, title, img, content, link }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "cat.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  // const data = useStaticQuery(graphql`
  //     query {
  //       placeholderImage: file(relativePath: { eq: "" }) {
  //         childImageSharp {
  //           fluid(maxWidth: 300) {
  //             ...GatsbyImageSharpfluid
  //           }
  //         }
  //       }
  //     }
  //   `)

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
        <Img fluid={data.file.childImageSharp.fluid} imgStyle={{ objectFit: 'cover' }} style={{height:'100%'}}/>
      </div>
      <div className={`${type}-card-content ${isMouseOver}`}>{content}</div>
      <button
        className={`btn ${type}-card-btn  ${isMouseOver}`}
      >
        <Link to={`${link}`}> Więcej...</Link>
      </button>
    </div>
  )
}

Card.propTypes = {
  type: PropTypes.oneOf(Object.keys(CardType)).isRequired,
}

export default Card
