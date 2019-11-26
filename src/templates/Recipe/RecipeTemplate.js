import React, { useState, useEffect } from "react"
import Layout from "../../components/layout"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb"
import sort from "fast-sort"

import CheckBox from "../../components/CheckBox/CheckBox"
import Listonic from '../../components/Listonic/Listonic'
import { MobileButton } from "./MobileButtons"
import { Step } from "./Step"
import Separator, {
  separatorDirection,
} from "../../components/Separator/Separator"

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
  const [isListonicVisible, setIsListonicVisible] = useState(false)
  useEffect(() => {
    window.addEventListener("resize", getPageSize)
    getPageSize()
    return () => {
      window.removeEventListener("resize", getPageSize)

    }
  }, [])

  const getPageSize = e => {
    setPageSize(window.innerWidth)
  }

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
                      <li>
                        <div className={styles.listItem}>
                          <CheckBox>
                            {`${ingredient.name} ${ingredient.quantity} ${ingredient.unit}`}
                          </CheckBox>
                        </div>
                      </li>
                    ))}

                  </ul>
                    { isListonicVisible &&
                     <Listonic
                      closeListonic={()=>setIsListonicVisible(false)}
                      ingredients={ingredients}  
                      title={name}
                      /> }
                 
                </div>

                <Separator
                  direction={separatorDirection.vertical}
                  className={styles.separatorV}
                />

                <div className={styles.buttons}>
                  <button className="button">Zapisz PDF</button>
                  <button className="button">Drukuj</button>
                  <button className="button" onClick={()=>setIsListonicVisible(true)}>Listonic</button>
                  <button className="button">E-mail</button>
                  <a href={`listonic://listonicbutton/%7B%22version%22:%221.0%22,%22sourceUrl%22:%22https://www.przepisy.pl/przepis/wegierski-gulasz-z-kasza-gryczana%22,%22data%22:%7B%22items%22:%5B%22%C5%82opatka%20wieprzowa%20-%20500%20gram%22,%22Naturalnie%20smaczne%20Gulasz%20Knorr%20-%201%20opakowanie%22,%22papryka%20czerwona%20-%201%20sztuka%22,%22papryka%20zielona%20-%201%20sztuka%22,%22cebula%20-%202%20sztuka%22,%22kasza%20gryczana%20-%20400%20gram%22,%22bulion%20-%201%20litr%22,%22woda%20-%201,25%20litr%22,%22Papryka%20s%C5%82odka%20z%20Hiszpanii%20Knorr%20-%201%20%C5%82y%C5%BCeczka%22,%22Papryka%20ostra%20z%20Hiszpanii%20Knorr%20-%201%20%C5%82y%C5%BCeczka%22,%22Majeranek%20z%20kraj%C3%B3w%20%C5%9Br%C3%B3dziemnomorskich%20Knorr%20-%201%20%C5%82y%C5%BCeczka%22,%22Li%C5%9B%C4%87%20laurowy%20z%20Turcji%20Knorr%20-%202%20sztuka%22,%22Ziele%20angielskie%20z%20Meksyku%20Knorr%20-%203%20ziarno%22,%22kwa%C5%9Bna%20%C5%9Bmietana%20-%200%20unit%22,%22Kminek%20z%20Polski%20Knorr%20-%200%20szczypta%22,%22olej%20do%20sma%C5%BCenia%20-%200%20unit%22%5D,%22name%22:%22W%C4%99gierski%20gulasz%20z%20kasz%C4%85%20gryczan%C4%85%20%20%22%7D%7D?link_click_id=654672471203054780"`} >Test listonic</a>
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
                <Step className={styles.step} {...step} />
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
    </Layout>
  )
}

export default Recipe
