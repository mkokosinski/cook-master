import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

import styles from "./RecipePage.module.scss"
import SimpleCard from "../Cards/SimpleCard"
import SearchInput from "../SearchInput/SearchInput"
import InfiniteScroll from "react-infinite-scroller"
import Loader from "../Loader/BallLoader"
import BreadCrumb from "../BreadCrumb/BreadCrumb"

const Przepisy = ({ location }) => {
  const [cards, setCards] = useState([])
  const [limit, setLimit] = useState(5)
  const [hasMore, setHasMore] = useState(true)
  const span = 5

  const recipeQuery = useStaticQuery(graphql`
    {
      allRecipe {
        edges {
          node {
            id
            name
            childrenStep {
              desc
              id
              img
              step
            }
            image {
              childImageSharp {
                fluid(quality: 100, maxWidth:1600, maxHeight:700, srcSetBreakpoints: [600]) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  `)

  const loadMore = () => {
    let { edges: recipes, totalCount } = recipeQuery.allRecipe
    recipes = [...recipes, ...recipes, ...recipes, ...recipes]
    totalCount = 24

    if (limit <= totalCount + span) {
      setCards([...cards, ...recipes.slice(limit - span, limit)])
      setLimit(limit + span)
    } else {
      setHasMore(false)
    }
  }

  return (
    <div className={styles.recipePage}>
      <BreadCrumb pathname={location.pathname} />
      <SearchInput />
      <InfiniteScroll
        className={styles.grid}
        loadMore={loadMore}
        hasMore={hasMore}
        initialLoad={true}
        threshold={400}
        loader={<Loader />}
      >
        {cards.map(({ node: recipe }, index) => (
          <SimpleCard
            img={recipe.image}
            content={recipe.desc}
            title={recipe.name}
            key={index + recipe.id}
            link={"/Recipes/" + recipe.name}
          />
        ))}
      </InfiniteScroll>

      {/* </div> */}
    </div>
  )
}

export default Przepisy
