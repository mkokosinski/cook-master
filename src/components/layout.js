/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
// import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"

import { Router } from "@reach/router"
import Navbar from "./Navbar/Navbar"
import "./style/layout.scss"
import Footer from './Footer/Footer';
import Tips from './../components/Tips/TipsPage';
import PrivateRoute from "./privateRoute";
import Recipes from './../components/Recipes/RecipesPage';
import Home from './../components/Home/Home';

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  return (
    <div className="App">
      <Navbar />
      <main>
      <Router>
        <Home exact path='/' />
        <Tips path='/Tips' />
        <PrivateRoute path='/Recipes' component={Recipes} />
      </Router>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// }

export default Layout
