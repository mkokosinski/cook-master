import React from "react"
import SignUp from "../components/Auth/SignUp"
import SEO from "../components/seo"
import { signUp } from "../helpers/menuLinks"

 const SignUpPage = ({location}) => {
    return (
      <>
        <SEO title={signUp.name} />
  
        <SignUp location={location}/>
      </>
    )
  }
  export default SignUpPage