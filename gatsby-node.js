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
            childrenRates {
              rate
            }
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
    const { id, name, childrenRates } = edge.node

    const formattedRates = childrenRates.map(node => node.rate)
    const ratesAvg =
      formattedRates.reduce((a, b) => a + b, 0) / formattedRates.length

    createPage({
      component: recipeTemplate,
      path: "/Przepisy/" + name,
      context: {
        id: id,
        ratesAvg,
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
  }

  if (page.path === '/recipes/') {
    page.path = '/Przepisy/'
  }
  
  if (page.path === '/tips/') {
    page.path = '/Porady/'
  }
  
  createPage(page)
}

// in our on-create-node.js
module.exports.onCreateNode = async ({ node, actions, store, cache }) => {
  // if the node is not DogImage, we don't wanna do anything
  const { type } = node.internal
  if (type === "Tip" || type === "Recipe" || type === "Step") {
    const { createNode } = actions
    // download image and create a File node
    // with gatsby-transformer-sharp and gatsby-plugin-sharp
    // that node will become an ImageSharp

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