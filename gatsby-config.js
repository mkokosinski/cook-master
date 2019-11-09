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
      resolve: "@martinreiche/gatsby-firestore",
      options: {
        credential: require("./firebase.json"),
        types: [
          {
            type: "Tip",
            collection: "Tips",
            map: doc => {
              return {
                ...doc
              }
            },
          },
          {
            type: "Recipe",
            collection: "Recipes",
            map: doc => ({
              ...doc
            }),
            subCollections:[{
              type: `Step`,
                collection: `steps`,
                map: doc => ({
                    ...doc
                  })
            }]
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
