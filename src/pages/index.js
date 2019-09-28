import React from "react"
import Layout from '../components/layout'
import Home from '../components/Home/Home'
import Tips from './../components/Tips/TipsPage';
import PrivateRoute from "../components/privateRoute";
import Recipes from './../components/Recipes/RecipesPage';
import { Router } from "@reach/router"

const HomePage = () => {
  return (
    <Layout>
      <Router>
        <Home exact path="/" />
      </Router>
    </Layout>
  )
}

export default HomePage
