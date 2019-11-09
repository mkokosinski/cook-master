/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")
const { createRemoteFileNode } = require("gatsby-source-filesystem")

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const tipTemplate = path.resolve("./src/templates/Tip/TipTemplate.js")
  const recipeTemplate = path.resolve(
    "./src/templates/Recipe/RecipeTemplate.js"
  )
  const res = await graphql(`
    {
      allTip {
        edges {
          node {
            id
            name
            img
            desc
          }
        }
      }
      allRecipe {
        edges {
          node {
            name
            id
          }
        }
      }
    }
  `)
  createRemoteFileNode
  res.data.allTip.edges.forEach(edge => {
    createPage({
      component: tipTemplate,
      path: "/Tips/" + edge.node.name,
      context: {
        id: edge.node.id,
      },
    })
  })

  res.data.allRecipe.edges.forEach(edge => {
    createPage({
      component: recipeTemplate,
      path: "/Recipe/" + edge.node.name,
      context: {
        id: edge.node.id
      },
    })
  })
}

// You can delete this file if you're not using it

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
module.exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // page.matchPath is a special key that's used for matching pages
  // only on the client.

  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*"
    // Update the page.
    createPage(page)
  }
}
