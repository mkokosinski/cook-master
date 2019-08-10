import React from 'react'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Home from '../components/Home/Home'

const HomePage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <Home />
    </Layout>
  )
}

export default HomePage
