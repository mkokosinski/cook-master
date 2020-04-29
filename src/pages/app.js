import React from 'react'
import Layout from '../components/layout'

import PrivateRoute from "../components/PrivateRoute";
// import SignIn from '../components/Auth/SignIn'
// import SignUp from '../components/Auth/SignUp'
import { Router } from "@reach/router"
import { AddRecipeForm } from './../components/Forms/AddRecipeForm';
import { Route } from 'react-router-dom';



const App = () => {
  return (
      <Layout>
        <Router>
          <PrivateRoute exact path='app/addRecipe' component={AddRecipeForm} />
        </Router>
      </Layout>
  )
}

export default App
