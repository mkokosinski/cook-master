import React from "react"
import { graphql } from "gatsby"
import Breadcrumb from '../../components/BreadCrumb/BreadCrumb'
import Header from "./TipHeader"

import styles from "./TipTemplate.module.scss"

export const query = graphql`
  query($id: String) {
    tip(id: { eq: $id }) {
      desc
      name
      id
      image {
        childImageSharp {
          fluid(quality: 100, maxWidth:1600, maxHeight:700, srcSetBreakpoints: [600]) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`
const Tip = ({ data, location }) => {
  const { name, desc, image } = data.tip
  
  return (
    <>
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Breadcrumb pathname={location.pathname} />
      </div>
      <div className={styles.cardContainer}>
        <Header img={image} title={name} />
        <div className={styles.content}>
          <div className={styles.metaData}>
            <div>Dodano: 19.10.2029</div>
            <div>Wyświetlenia: 48</div>
          </div>
          <article className={styles.desc}>
            <h3>{name}</h3>
            <p>{desc}</p>
          </article>
        </div>
      </div>
    </div>
  </>
  )
}

export default Tip
