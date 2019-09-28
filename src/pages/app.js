import React from 'react'
import Layout from '../components/layout'
import Home from '../components/Home/Home'
import Tips from './../components/Tips/TipsPage';
import PrivateRoute from "../components/privateRoute";
import Recipes from './../components/Recipes/RecipesPage';
import { Router } from "@reach/router"


const App = () => {
  return (
    <Layout>
      <Router>
        <Home exact path='app/' />
        <Tips exact path='app/Tips' />
        <PrivateRoute exact path='app/Recipes' component={Recipes} />
      </Router>
    </Layout>
  )
}

export default App
