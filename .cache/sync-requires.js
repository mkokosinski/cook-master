const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-components-recipes-recipe-template-js": hot(preferDefault(require("C:\\Programowanie\\kuchmistrz-gatsby\\src\\components\\Recipes\\RecipeTemplate.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("C:\\Programowanie\\kuchmistrz-gatsby\\src\\pages\\404.js"))),
  "component---src-pages-app-js": hot(preferDefault(require("C:\\Programowanie\\kuchmistrz-gatsby\\src\\pages\\app.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("C:\\Programowanie\\kuchmistrz-gatsby\\src\\pages\\index.js")))
}

