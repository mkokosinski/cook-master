import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import Home from '../components/Home/Home'
import Tips from '../components/Tips/TipsPage';
import PrivateRoute from "../components/PrivateRoute";
import Recipes from '../components/Recipes/RecipesPage';
import SignIn from '../components/Auth/SignIn'
import SignUp from '../components/Auth/SignUp'
import { Router } from "@reach/router"
import { AddRecipeForm } from './../components/Forms/AddRecipeForm';
import {isAuthorized, AuthContext} from '../services/auth'



const App = () => {
  const [currentUser, setCurrentUser] = useState({ isLoggedIn: false, user: {} })
  useEffect(() => {
    const user = localStorage.getItem('user')
    isAuthorized(setCurrentUser)

  }, [])
  return (
    <AuthContext.Provider value={currentUser}>
      <Layout>
      {currentUser.isLoggedIn}

        <Router>
          <Home exact path='app/' />
          <Tips exact path='app/Tips' />
          <SignIn exact path='app/SignIn' />
          <SignUp exact path='app/SignUp' />
          <PrivateRoute exact path='app/Recipes' component={Recipes} />
          <PrivateRoute exact path='app/AddRecipe' component={AddRecipeForm} />
        </Router>
      </Layout>
    </AuthContext.Provider>
  )
}

export default App
