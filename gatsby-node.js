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
      path: "/Porady/" + edge.node.name,
      context: {
        id: edge.node.id,
      },
    })
  })

  res.data.allRecipe.edges.forEach(edge => {
    const { id, name } = edge.node

    // const formattedRates = childrenRates.map(node => node.rate)
    // const ratesAvg =
    //   formattedRates.reduce((a, b) => a + b, 0) / formattedRates.length

    createPage({
      component: recipeTemplate,
      path: "/Przepisy/" + name,
      context: {
        id: id,
        // ratesAvg,
      },
    })
  })
}

module.exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*"
    // Update the page.
  }

  createPage(page)
}

module.exports.onCreateNode = async ({ node, actions, store, cache }) => {
  const { type } = node.internal
  if (type === "Tip" || type === "Recipe" || type === "Step") {
    const { createNode } = actions
    let img = `https://firebasestorage.googleapis.com/v0/b/cookmaster-9494a.appspot.com/o/img%2Fdinner_placeholder.png?alt=media&token=87d365a0-1984-40f4-8e99-9143b1bfadbc`

    if (node.img && node.hasOwnProperty("img")) {
      img = node.img
    }

    const fileNode = await createRemoteFileNode({
      url: img,
      store,
      cache,
      createNode,
      createNodeId: id => `image-sharp-${id}`,
    })

    if (fileNode) {
      // link File node to DogImage node
      // at field image
      node.image___NODE = fileNode.id
    }
  }
}
