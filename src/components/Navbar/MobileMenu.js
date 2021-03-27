import React, { useContext } from "react"
import { Link } from "gatsby"
import {
  tips,
  recipes,
  signIn,
  addRecipe,
  signUp,
  signOut,
} from "../../helpers/menuLinks"

import "./MobileMenu.scss"
import { AuthContext } from "../../services/auth"
import { useLocation } from "@reach/router"

const MobileMenu = ({ logOutHandler, burgerIsOpen, toggleBurger, items }) => {
  const location = useLocation()
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <>
      <div className={`mobile-menu ${burgerIsOpen && "open"}`}>
        <Link
          onClick={toggleBurger}
          className="nav-btn"
          activeClassName="nav-btn--active"
          to={"/" + tips.slug}
        >
          {tips.name}
        </Link>
        <Link
          onClick={toggleBurger}
          className="nav-btn"
          activeClassName="nav-btn--active"
          to={"/" + recipes.slug}
        >
          {recipes.name}
        </Link>
        {isLoggedIn ? (
          <>
            <Link
              onClick={toggleBurger}
              className="nav-btn"
              activeClassName="nav-btn--active"
              to={"/" + addRecipe.slug}
            >
              {addRecipe.name}
            </Link>
            <div
              className="nav-btn"
              activeClassName="nav-btn--active"
              onClick={logOutHandler}
            >
              {signOut.name}
            </div>
          </>
        ) : (
          <>
            <Link
              onClick={toggleBurger}
              className="nav-btn"
              activeClassName="nav-btn--active"
              to={"/" + signIn.slug}
              state={{ from: location.pathname }}
            >
              {signIn.name}
            </Link>
            <Link
              onClick={toggleBurger}
              className="nav-btn"
              activeClassName="nav-btn--active"
              to={"/" + signUp.slug}
              state={{ from: location.pathname }}
            >
              {signUp.name}
            </Link>
          </>
        )}

        <div
          className="mobile-menu-bg"
          onClick={toggleBurger}
          role="none"
        ></div>
      </div>
    </>
  )
}

export default MobileMenu
