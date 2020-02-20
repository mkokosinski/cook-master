import React from "react"
import SignIn from "../components/Auth/SignIn"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { signIn } from "../helpers/menuLinks"

 const SignInPage = ({location}) => {
    return (
      <Layout>
        <SEO title={signIn.name} />
  
        <SignIn location={location}/>
      </Layout>
    )
  }
  export default SignInPage