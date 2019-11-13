import React from "react"
import Layout from '../components/layout'
import Home from '../components/Home/Home'
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
