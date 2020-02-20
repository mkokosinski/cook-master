/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, useEffect } from "react"
// import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"
import { ToastContainer, toast } from 'react-toastify';

import Navbar from "./Navbar/Navbar"
import Footer from "./Footer/Footer"
import "../../node_modules/bulma/bulma.sass"
import "./style/layout.scss"
import { isAuthorized, AuthContext } from "../services/auth"
import Background from "./Background/Background"
import 'react-toastify/dist/ReactToastify.min.css';

toast.configure()

const Layout = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: typeof window !== 'undefined' && window ? localStorage.getItem("user") !== null : false,
    user: {},
  })
  useEffect(() => {
    isAuthorized(setCurrentUser)
  }, [])

  return (
    <AuthContext.Provider value={currentUser}>
        <div className="App">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
    </AuthContext.Provider>
  )
}

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// }

export default Layout
