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
      Category__NODE
      Desc
      Img
      Title
      id
    }
  }
`
const Tip = ({ data, location }) => {
  const { Title, Img, Desc } = data.tip
  return (
    <Layout>
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Breadcrumb pathname={location.pathname} />
      </div>
      <div className={styles.cardContainer}>
        <Header imgSrc={Img} altImg={`Image: ` + Img} title={Title} />
        <div className={styles.content}>
          <div className={styles.metaData}>
            <div>Dodano: 19.10.2029</div>
            <div>Wyświetlenia: 48</div>
          </div>
          <article className={styles.desc}>
            <h3>{Title}</h3>
            <p>{Desc}</p>
          </article>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default Tip
