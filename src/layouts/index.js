/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
// import { useStaticQuery, graphql } from 'gatsby'
import { ToastContainer, toast } from 'react-toastify';

import Navbar from '../components//Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import  '../components/style/layout.scss'
import { isAuthorized, AuthContext } from '../services/auth'
import 'react-toastify/dist/ReactToastify.min.css';

toast.configure()

const Layout = ({ children }) => {
  return (
        <div className="App">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
  )
}
// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// }

export default Layout
