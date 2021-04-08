import React, { useState, useEffect, useContext } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb"
import sort from "fast-sort"

import CheckBox from "../../components/CheckBox/CheckBox"
import Listonic from "../../components/Listonic/ListonicButton"
import { MobileButton } from "./MobileButtons"
import { Step } from "./Step"
import Separator, {
  separatorDirection,
} from "../../components/Separator/Separator"
import RatingStars from "../../components/RatingStars/RatingStars"
import { saveRacipeRate, getRecipeRate } from "../../services/api"
import { AuthContext } from "../../services/auth"

import styles from "./RecipeTemplate.module.scss"

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
        index
        label
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
      }
    }
  }
`

const Recipe = ({ data, location }) => {
  const [PageSize, setPageSize] = useState("")
  const [currentUserRate, setCurrentUserRate] = useState(null)

  const { isLoggedIn, user } = useContext(AuthContext)

  const {
    id,
    name,
    image,
    childrenStep: steps,
    childrenIngredient: ingredients,
  } = data.recipe

  sort(steps).asc(step => step.index)

  // const formattedRates = rates.map(node => node.rate)
  // const ratesAvg =
  //   formattedRates.reduce((a, b) => a + b, 0) / formattedRates.length

  const ratesAvg = 3

  useEffect(() => {
    if (isLoggedIn) {
      getRecipeRate(id, user.uid)
        .then(rate => {
          console.log(rate)
          setCurrentUserRate(rate)
        })
        .catch(err => console.error(err))
    }

    window.addEventListener("resize", getPageSize)
    getPageSize()
    return () => {
      window.removeEventListener("resize", getPageSize)
    }
  }, [])

  const getPageSize = e => {
    setPageSize(window.innerWidth)
  }

  const saveRate = rate => {
    const doc = { rate, userId: user.uid, recipeId: id }
    saveRacipeRate(doc)
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Breadcrumb pathname={location.pathname} />
        </div>

        <div className={styles.cardContainer}>
          <div className={styles.grid}>
            <div className={styles.left}>
              <h1 className={styles.titleImg}>{name}</h1>
              <div className={styles.imgContainer}>
                <div className={styles.img}>
                  <Img
                    fluid={image.childImageSharp.fluid}
                    imgStyle={{ objectFit: "cover", objectPosition: "center" }}
                    style={{ height: "100%" }}
                  />
                </div>
              </div>

              {isLoggedIn && (
                <div className={styles.rating}>
                  <div className={styles.ratingLabel}>Oceń:</div>
                  <div className={styles.ratingIcons}>
                    <RatingStars rating={currentUserRate} saveRate={saveRate} />
                  </div>
                </div>
              )}
              <div className={styles.buttons}>
                {/* <button className="button">Zapisz PDF</button> */}
                {/* <button className="button">Drukuj</button> */}
                <Listonic
                  className="button"
                  ingredients={ingredients}
                  recipeTitle={name}
                />
                {/* <button className="button">E-mail</button> */}
              </div>

              <Separator
                direction={separatorDirection.horizontal}
                className={styles.separatorH}
              />
              {/* TODO Add number of servings */}
              <div className={styles.ingredients}>
                <h2 className={styles.title}>Składniki</h2>
                <div className={styles.listOfIndegredients}>
                  <ul>
                    {ingredients.map(ingredient => (
                      <li key={ingredient.name}>
                        <div className={styles.listItem}>
                          <CheckBox>
                            {`${ingredient.name} ${ingredient.quantity} ${ingredient.unit}`}
                          </CheckBox>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <Separator
              direction={separatorDirection.vertical}
              className={`${styles.separatorV} ${styles.ml30}`}
            />

            <div className={styles.steps}>
              <h2 className={styles.title}>Przygotowanie</h2>
              {steps
                .sort((a, b) => a.label.localeCompare(b.label))
                .map(step => (
                  <Step key={step.name} className={styles.step} {...step} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Recipe
