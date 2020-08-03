import React from "react"
import RecipePage from "../components/Recipes/RecipesPage"
import SEO from "../components/seo"
import { recipes } from "../helpers/menuLinks"

 const Recipes = ({location}) => {
    return (
      <>
        <SEO title={recipes.name} />
        <RecipePage location={location}/>
      </>
    )
  }
  export default Recipes