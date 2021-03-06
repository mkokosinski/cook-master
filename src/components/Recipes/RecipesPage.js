import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import SimpleCard from "../Cards/SimpleCard"
import GridView from "../../templates/GridView/GridView"

const Przepisy = ({ location }) => {
  const recipeQuery = useStaticQuery(graphql`
    {
      allRecipe {
        edges {
          node {
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
          }
        }
      }
    }
  `)
const recipes = recipeQuery.allRecipe;
  return (
    <GridView items={recipes} location={location} CardComponent={SimpleCard} slug={'Przepisy'}/>
  )
}

export default Przepisy
