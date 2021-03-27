import React from "react"
import TipsPage from "../components/Tips/TipsPage"
import SEO from "../components/seo"
import { addRecipe, tips } from "../helpers/menuLinks"
import { AddRecipeForm } from "../components/Forms/AddRecipeForm"

const AddRecipe = () => {
  return (
    <>
      <SEO title={addRecipe.name} />

      <AddRecipeForm />
    </>
  )
}
export default AddRecipe
