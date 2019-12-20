import React from "react"
import SearchInput from "../SearchInput/SearchInput"
import { graphql, useStaticQuery, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import styles from "./HomePage.module.scss"

import tipsImg from "../../images/chef.svg"
import recipeImg from "../../images/recipe-book.svg"
import { Newsletter } from "../Newsletter/Newsletter"
import { tips, recipes } from "../../helpers/menuLinks"

const Home = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "bg.png" }) {
        childImageSharp {
          fluid(
            quality: 100
            maxWidth: 1600
            maxHeight: 700
            srcSetBreakpoints: [320, 600, 1200, 1920]
          ) {
            ...GatsbyImageSharpFluid
          }
        }
      }

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

  const MobileTiles = () => (
    <>
      <div className="card">
        <Link className={styles.news} to={"/" + tips.slug}>
          <img src={tipsImg} alt="Tips" />
          {tips.name}
        </Link>
      </div>
      <div className="card">
        <Link className={styles.news}to={"/" + recipes.slug}>
          <img src={recipeImg} alt="Recipe" />
          {recipes.name}
        </Link>
      </div>
    </>
  )
  // const DesktopTiles = () => (
  //   <>
  //     {/* <SimpleCard
  //       img={recipe.image}
  //       content={recipe.desc}
  //       title={recipe.name}
  //       key={index + recipe.id}
  //       link={"/Recipes/" + recipe.name}
  //     />
  //     <SimpleCard
  //       img={recipe.image}
  //       content={recipe.desc}
  //       title={recipe.name}
  //       key={index + recipe.id}
  //       link={"/Recipes/" + recipe.name}
  //     /> */}
  //   </>
  // )

  console.log("data", data)

  return (
    <BackgroundImage
      fluid={data.file.childImageSharp.fluid}
      imgStyle={{ objectFit: "cover" }}
      style={{ height: "100%" }}
    >
      <div className={styles.home}>
        <div className={`card ${styles.seachDialog}`}>
          <label htmlFor="seachInput">Wpisz co Cię interesuje:</label>
          <div className={styles.searchInput}>
            <SearchInput />
          </div>
        </div>
      <div className={styles.newses}>
        {/* {PageSize <= 800 ? <MobileTiles /> : <DesktopTiles />} */}
        <MobileTiles /> 
      </div>

      </div>
      <Newsletter />
    </BackgroundImage>
  )
}

export default Home
