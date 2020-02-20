import React from "react"
import SignUp from "../components/Auth/SignUp"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { signUp } from "../helpers/menuLinks"

 const SignUpPage = ({location}) => {
    return (
      <Layout>
        <SEO title={signUp.name} />
  
        <SignUp location={location}/>
      </Layout>
    )
  }
  export default SignUpPage