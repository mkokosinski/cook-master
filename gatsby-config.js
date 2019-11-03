let activeEnv = process.env.ACTIVE_ENV
console.clear()
if (!activeEnv) {
  activeEnv = "development"
}

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

const config = require("gatsby-plugin-config")

module.exports = {
  pathPrefix: "/cook-master",
  siteMetadata: {
    title: `Kuchmistrz`,
    description: `The best app for junior chefes`,
    author: `@masterknightMK`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        whitelist: ["MY_VAR", "MY_OTHER_VAR"],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `recipes`,
        path: `${__dirname}/src/pages/recipes`,
      },
    },
    'gatsby-plugin-sharp', 
    'gatsby-transformer-sharp',
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    {
      resolve: "gatsby-source-firestore",
      options: {
        credential: require("./firebase.json"),
        types: [
          {
            type: "Categories",
            collection: "Categories",
            map: doc => {
              return {
                Name: doc.Name,
              }
            },
          },
          {
            type: "Tips",
            collection: "Tips",
            map: doc => {
              return {
                Category__NODE: doc.Category.id,
                Desc: doc.Desc,
                Img: doc.Img,
                Title: doc.Title,
              }
            },
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}