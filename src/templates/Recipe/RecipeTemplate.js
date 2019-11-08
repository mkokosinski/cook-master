import React from "react"
import Layout from "../../components/layout"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb"

import styles from "./RecipeTemplate.module.scss"

export const query = graphql`
  query($id: String!) {
    recipe(id: { eq: $id }) {
      id
      name
      childrenStep {
        desc
        id
        img
        step
      }
    }
  }
`
const Recipe = ({ data, location }) => {
  const { name, img, desc } = data.tip
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Breadcrumb pathname={location.pathname} />
        </div>
        <div className={styles.cardContainer}></div>
      </div>
    </Layout>
  )
}

export default Recipe
