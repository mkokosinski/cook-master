let activeEnv = process.env.ACTIVE_ENV
if (!activeEnv) {
  activeEnv = "production"
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
    `gatsby-plugin-layout`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        directives: {
          "script-src": "'self' www.google-analytics.com",
          "style-src": "'self' 'unsafe-inline'",
          "img-src": "'self' data: www.google-analytics.com",
          // you can add your directives or override defaults
        },
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/,
        },
      },
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
                ...doc,
              }
            },
          },
          {
            type: "Recipe",
            collection: "Recipes",
            map: doc => ({
              ...doc,
            }),
            subCollections: [
              {
                type: `Step`,
                collection: `steps`,
                map: doc => ({
                  ...doc,
                }),
              },
              {
                type: `Ingredient`,
                collection: `ingredients`,
                map: doc => ({
                  ...doc,
                }),
              },
              {
                type: `Rates`,
                collection: `rates`,
                map: doc => ({ ...doc }),
              },
            ],
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
