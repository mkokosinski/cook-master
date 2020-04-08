import React, { useState, useEffect } from 'react'

import PrivateRoute from "../components/PrivateRoute";
import SignIn from '../components/Auth/SignIn'
import SignUp from '../components/Auth/SignUp'
import { Router } from "@reach/router"
import { AddRecipeForm } from './../components/Forms/AddRecipeForm';



const App = () => {
  return (
      <>
        <Router>
          <PrivateRoute exact path='app/addRecipe' component={AddRecipeForm} />
        </Router>
      </>
  )
}

export default App
