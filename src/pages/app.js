import React from "react"

import PrivateRoute from "../components/PrivateRoute"
import { Router } from "@reach/router"
import { AddRecipeForm } from "./../components/Forms/AddRecipeForm"

const App = () => {
  return (
    <>
      <Router>
        <PrivateRoute exact path="app/addRecipe" component={AddRecipeForm} />
      </Router>
    </>
  )
}

export default App
