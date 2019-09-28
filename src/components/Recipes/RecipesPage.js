import React, { useEffect } from "react"
import { uploadImg } from "../../services/api"
import { useStaticQuery, graphql, Link } from "gatsby"

const Przepisy = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
            }
            html
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  const recipes = data.allMarkdownRemark.edges
  return (
    <>
      <div>
        <label htmlFor="ima">
          Wyślij plik
          <input
            style={{ opacity: 0 }}
            type="file"
            name="ima"
            id="ima"
            onChange={e => {
              uploadImg(e).then(res => {
                console.log(res)
              })
            }}
          />
        </label>
      </div>
      <div>
        {recipes.map(recipe => (
          <div key={recipe.node.frontmatter.title}>
            <Link to={`/Recipes/${recipe.node.fields.slug}`}>Title: {recipe.node.frontmatter.title}</Link>
            <p>
              HTML: {recipe.node.html}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Przepisy
