import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import styles from "./Footer.module.scss"
import { FooterMenu } from "./FooterMenu"

const Footer = () => {
  const data = useStaticQuery(graphql`
    {
      imageSharp(fluid: { originalName: { eq: "logo-white.png" } }) {
        fluid(
          quality: 100
          maxWidth: 200
          srcSetBreakpoints: [300, 600, 900, 1200]
        ) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  `)
  const logo = data.imageSharp.fluid
  return (
    <div className={styles.footer}>
      <div className={styles.img}>
        <Img
          fluid={logo}
          imgStyle={{ objectFit: "contain" }}
          style={{ width: "100%" }}
        />
      </div>

      <div className={styles.text}>
        ©2019 kuchmistrz.pl Wszystkie prawa zastrzeżone Kopiowanie i
        rozpowszechnianie bez zgody kuchmistrz.pl zabronione
      </div>
      <FooterMenu />
    </div>
  )
}

export default Footer
