import React from "react"
import RecipePage from "../components/Recipes/RecipesPage"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { recipes } from "../helpers/menuLinks"

 const Recipes = ({location}) => {
    return (
      <Layout>
        <SEO title={recipes.name} />
  
        <RecipePage location={location}/>
      </Layout>
    )
  }
  export default Recipes