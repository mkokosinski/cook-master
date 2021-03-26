import React from "react"
import TipsPage from "../components/Tips/TipsPage"
import SEO from "../components/seo"
import { tips } from "../helpers/menuLinks"
 
 const Tips = ({location}) => {
  return (
    <>
      <SEO title={tips.name} />

      <TipsPage location={location}/>
    </>
  )
}
export default Tips