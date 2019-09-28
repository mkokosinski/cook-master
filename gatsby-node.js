/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")

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

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = path.basename(node.fileAbsolutePath, ".md")

    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

module.exports.createPages  = async({ graphql, actions }) => {
  const { createPage } = actions
  const recipeTemplate = path.resolve(
    "src/components/Recipes/RecipeTemplate.js"
  )
  const query = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  const edges = query.data.allMarkdownRemark.edges;
  edges.forEach(edge => {
    createPage({
      component: recipeTemplate,
      path: `/Recipes/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug
      }
    })
  });
    
    
}
