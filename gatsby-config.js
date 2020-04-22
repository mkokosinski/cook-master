let activeEnv = process.env.ACTIVE_ENV
console.clear()
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
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    `gatsby-transformer-remark`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        // disableOnDev: true,
        // reportOnly: false, // Changes header to Content-Security-Policy-Report-Only for csp testing purposes
        // mergeScriptHashes: true, // you can disable scripts sha256 hashes
        // mergeStyleHashes: true, // you can disable styles sha256 hashes
        // mergeDefaultDirectives: true,
        directives: {
          "script-src": "'self' www.google-analytics.com",
          "style-src": "'self' 'unsafe-inline'",
          "img-src": "'self' data: www.google-analytics.com"
          // you can add your directives or override defaults
        }
      }
    },
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
                ...doc,
              }
            }
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
                map: doc => ({...doc})
              }
            ],
          }
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
