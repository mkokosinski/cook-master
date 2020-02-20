import React, { useEffect, useContext } from "react"
import { navigate } from "gatsby"
import { signIn } from "../helpers/menuLinks"
import { AuthContext } from "../services/auth"

const PrivateRoute = (props) => {
  const { isLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    const  { location } = props;
    let noOnLoginPage = location.pathname !== `app/` + signIn.slug
    console.log("Is Auth", isLoggedIn, noOnLoginPage)
    if (!isLoggedIn && noOnLoginPage) {
      navigate(`app/${signIn.slug}`, {state:{from:location.pathname}})
    }
  }, [])

  const {component: Component, ...rest} = props;
  return isLoggedIn ? <Component {...rest}  /> : null
}
export default PrivateRoute
