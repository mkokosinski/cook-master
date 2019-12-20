import React from "react"
import TipsPage from "../components/Tips/TipsPage"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { tips } from "../helpers/menuLinks"
 
 const Tips = ({location}) => {
  return (
    <Layout>
      <SEO title={tips.name} />

      <TipsPage location={location}/>
    </Layout>
  )
}
export default Tips