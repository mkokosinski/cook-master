/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import { AuthProvider } from "./src/templates/ContextProviders"


// You can delete this file if you're not using it
// export const onClientEntry = () => {
//     // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
//     if (typeof window.IntersectionObserver === `undefined`) {
//       import(`intersection-observer`)
//       console.log(`# IntersectionObserver is polyfilled!`)
//     }
//   }

export const wrapRootElement = ({ element }) => (
  <AuthProvider>{element}</AuthProvider>
)