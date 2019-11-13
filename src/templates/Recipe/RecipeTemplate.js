import React from "react"
import Layout from "../../components/layout"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb"
import sort from "fast-sort"

import styles from "./RecipeTemplate.module.scss"
import { Step } from "./Step"

export const query = graphql`
  query($id: String!) {
    recipe(id: { eq: $id }) {
      id
      name
      image {
        childImageSharp {
          fluid(
            quality: 100
            maxWidth: 1600
            maxHeight: 700
            srcSetBreakpoints: [600]
          ) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      childrenIngredient {
        name
        quantity
        unit
      }
      childrenStep {
        desc
        id
        image {
          childImageSharp {
            fluid(
              quality: 100
              maxWidth: 1600
              maxHeight: 700
              srcSetBreakpoints: [600]
            ) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        step
      }
    }
  }
`

const Recipe = ({ data, location }) => {
  const {
    name,
    image,
    desc,
    childrenStep: steps,
    childrenIngredient: ingredients,
  } = data.recipe
  sort(steps).asc(step => step.step)
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Breadcrumb pathname={location.pathname} />
        </div>
        <div className={styles.cardContainer}>
          <div className={styles.grid}>
            <div className={styles.left}>
              <div className={styles.imgContainer}>
                <div className={styles.img}>
                  <Img
                    fluid={image.childImageSharp.fluid}
                    imgStyle={{ objectFit: "cover" }}
                    style={{ height: "100%" }}
                  />
                </div>
              </div>
              <div className={styles.ingredients}>
                <div className={styles.listOfIndegredients}>
                  {ingredients.map(ingredient => (
                    <ul>
                      <li>
                        {ingredient.name} {ingredient.quantity}{" "}
                        {ingredient.unit}
                      </li>
                    </ul>
                  ))}
                </div>
                <div className={styles.buttons}>
                  <button className="button is-primary">Zapisz PDF</button>
                  <button className="button is-primary">Drukuj</button>
                  <button className="button is-primary">Listonic</button>
                  <button className="button is-primary">E-mail</button>
                </div>
              </div>
            </div>

            <div className={styles.steps}>
              <div className={styles.title}>{name}</div>
              {steps.map(step => (
                <Step className={styles.step} {...step} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Recipe
