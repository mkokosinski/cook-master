import React, { useState } from "react"
import PropTypes from "prop-types"
import styles from "./SimpleCard.module.scss"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

export const CardType = {
  jumbo: "jumbo",
  twoSide: "twoSide",
  min: "min",
}

const Card = ({ title, img, content, link }) => {
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
    setIsMouseOver(styles.isMouseOver)
  }
  const onMouseLeave = () => {
    setIsMouseOver("")
  }
  return (
    <Link to={`${link}`}
      className={`card ${styles.simpleCard}`}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
        <h2 className={styles.simpleCardTitle}> {title}</h2>
        <div className={`${styles.simpleCardImg} ${isMouseOver}`}>
          <Img
            fluid={data.file.childImageSharp.fluid}
            imgStyle={{ objectFit: "cover" }}
            style={{ height: "100%" }}
          />
        </div>
      </Link>
  )
}

Card.propTypes = {
  type: PropTypes.oneOf(Object.keys(CardType)).isRequired,
}

export default Card
