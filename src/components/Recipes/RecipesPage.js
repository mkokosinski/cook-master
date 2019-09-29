import React, { useEffect } from "react"
import { uploadImg } from "../../services/api"
import { useStaticQuery, graphql, Link } from "gatsby"

const Przepisy = () => {
  const data = useStaticQuery(graphql`
    query {
      allTips {
        edges {
          node {
            Img
            Title
            Desc
            id
            Category__NODE
          }
        }
      }
    }
  `)
  // const recipes = data.allMarkdownRemark.edges
  const tips = data.allTips.edges
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
      {/* <div>
        {recipes.map(recipe => (
          <div key={recipe.node.frontmatter.title}>
            <Link to={`/Recipes/${recipe.node.fields.slug}`}>
              Title: {recipe.node.frontmatter.title}
            </Link>
            <div>
              HTML:
              <div dangerouslySetInnerHTML={{ __html: recipe.node.html }}></div>
            </div>
          </div>
        ))}
      </div> */}
      <div>
        TIPS:
        <div>
          {tips.map(({node:{Title, Desc}}) => {
            return (
              <div key={Title}>
                <h1> {Title}</h1>
                <p>{Desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Przepisy
