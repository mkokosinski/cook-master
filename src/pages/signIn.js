import React from "react"
import SignIn from "../components/Auth/SignIn"
import SEO from "../components/seo"
import { signIn } from "../helpers/menuLinks"

 const SignInPage = ({location}) => {
    return (
      <>
        <SEO title={signIn.name} />
  
        <SignIn location={location}/>
      </>
    )
  }
  export default SignInPage