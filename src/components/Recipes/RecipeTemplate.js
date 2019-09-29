import React from "react"
import Layout from "./../layout"
import { graphql } from "gatsby"

export const query = graphql`
  query($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      html
    }
  }
`

const RecipeTemplate = props => {
  const { title, date } = props.data.markdownRemark.frontmatter
  const { html } = props.data.markdownRemark

  return (
    <Layout>
      <h1>{title}</h1>
      <p>{date}</p>
      <div dangerouslySetInnerHTML={{__html: html}}></div>
    </Layout>
  )
}

export default RecipeTemplate
