import React, { useState, useEffect } from "react"
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
  sort(steps).asc(step => step.step)

  useEffect(() => {
    console.log(isLoggedIn)

    getRecipeRate(id, user.uid).then(rate => {
      setCurrentUserRate(rate)
    })

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
                    imgStyle={{ objectFit: "cover" }}
                    style={{ height: "100%" }}
                  />
                </div>
              </div>

              {isLoggedIn ? (
                <div className={styles.rating}>
                  <div className={styles.ratingLabel}>Oceń:</div>
                  <div className={styles.ratingIcons}>
                    <RatingStars
                      rating={currentUserRate}
                      saveRate={saveRate}
                    />
                  </div>
                </div>
              ) : null}

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

                <Separator
                  direction={separatorDirection.vertical}
                  className={styles.separatorV}
                />

                <div className={styles.buttons}>
                  <button className="button">Zapisz PDF</button>
                  <button className="button">Drukuj</button>
                  <Listonic
                    className="button"
                    ingredients={ingredients}
                    recipeTitle={name}
                  />
                  <button className="button">E-mail</button>
                </div>
              </div>
            </div>

            <Separator
              direction={separatorDirection.vertical}
              className={`${styles.separatorV} ${styles.ml30}`}
            />

            <div className={styles.steps}>
              <h2 className={styles.title}>Przygotowanie</h2>
              {steps.map(step => (
                <Step key={step.name} className={styles.step} {...step} />
              ))}
            </div>
          </div>

          {PageSize <= 600 && (
            <div>
              <MobileButton>t1 </MobileButton>
              <MobileButton>t2 </MobileButton>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Recipe
