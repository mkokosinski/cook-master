import React from "react"
import SearchInput from "../SearchInput/SearchInput"
import { graphql, useStaticQuery, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"

import TipsImg from "../../images/chef.svg"
import RecipeImg from "../../images/recipe-book.svg"
import BackgoundImg from "../../images/bg.svg"
import { Newsletter } from "../Newsletter/Newsletter"
import { tips, recipes } from "../../helpers/menuLinks"
import styles from "./HomePage.module.scss"
import "./BackgroundAnimations.scss"

const Home = () => {
  const data = useStaticQuery(graphql`
    query {
      recipe {
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
      }

      tip {
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
      }
    }
  `)

  return (
    <div className={styles.home}>
      <div className={styles.background}>
        <BackgoundImg />
      </div>
      <div className={`card ${styles.seachDialog}`}>
        <label htmlFor="seachInput">Wpisz co Cię interesuje:</label>
        <div className={styles.searchInput}>
          <SearchInput />
        </div>
      </div>
      <div className={styles.newses}>
        <div className="card">
          <Link className={styles.news} to={"/" + tips.slug}>
            <TipsImg />
            {tips.name}
          </Link>
        </div>
        <div className="card">
          <Link className={styles.news} to={"/" + recipes.slug}>
            <RecipeImg />
            {recipes.name}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
