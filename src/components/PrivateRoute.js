import React, { useEffect, useContext } from "react"
import { navigate } from "gatsby"
import { signIn } from "../helpers/menuLinks"
import { AuthContext } from "../services/auth"

const PrivateRoute = (props) => {
  const { isLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    const  { location } = props;
    let noOnLoginPage = location.pathname !== `app/` + signIn.slug
    if (!isLoggedIn && noOnLoginPage) {
      navigate(`/${signIn.slug}`, {state:{from:location.pathname}})
    }
  }, [])

  const {component: Component, ...rest} = props;
  return isLoggedIn ? <Component {...rest}  /> : null
}
export default PrivateRoute
