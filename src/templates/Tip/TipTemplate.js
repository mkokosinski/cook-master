import React from "react"
import Layout from "../../components/layout"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Breadcrumb from '../../components/BreadCrumb/BreadCrumb'
import Header from "./TipHeader"

import styles from "./TipTemplate.module.scss"

export const query = graphql`
  query($id: String) {
    tip(id: { eq: $id }) {
      desc
      img
      name
      id
    }
  }
`
const Tip = ({ data, location }) => {
  const { name, img, desc } = data.tip
  return (
    <Layout>
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Breadcrumb pathname={location.pathname} />
      </div>
      <div className={styles.cardContainer}>
        <Header imgSrc={img} altImg={`Image: ` + img} title={name} />
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
  </Layout>
  )
}

export default Tip
