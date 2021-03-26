import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Card from "../Cards/Card"
import GridView from "../../templates/GridView/GridView"
import "./Tips.scss"

const Porady = ({ location }) => {
  const tipsQuery = useStaticQuery(graphql`
    {
      allTip {
        totalCount
        edges {
          node {
            desc
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
            name
            id
          }
        }
      }
    }
  `)
  const tips = tipsQuery.allTip
  return (
    <GridView
      items={tips}
      CardComponent={Card}
      location={location}
      slug={"Porady"}
    />
  )
}

export default Porady
