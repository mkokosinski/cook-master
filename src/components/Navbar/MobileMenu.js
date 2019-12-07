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
import { logOut, AuthContext } from "../../services/auth"

const MobileMenu = ({ burgerIsOpen, toggleBurger, items }) => {
  const { isLoggedIn } = useContext(AuthContext)
  return (
    <div className={`mobile-menu ${burgerIsOpen && "open"}`}>
      <Link
        onClick={toggleBurger}
        className="nav-btn"
        activeClassName="nav-btn--active"
        to={"/app/" + tips.slug}
      >
        {tips.name}
      </Link>
      <Link
        onClick={toggleBurger}
        className="nav-btn"
        activeClassName="nav-btn--active"
        to={"/app/" + recipes.slug}
      >
        {recipes.name}
      </Link>
      {isLoggedIn ? (
        <>
          <Link
            onClick={toggleBurger}
            className="nav-btn"
            activeClassName="nav-btn--active"
            to={"/app/" + addRecipe.slug}
          >
            {addRecipe.name}
          </Link>
          <Link
            onClick={toggleBurger}
            className="nav-btn"
            activeClassName="nav-btn--active"
            to={"/app/" + signOut.slug}
            onClick={logOut}
          >
            {signOut.name}
          </Link>
        </>
      ) : (
        <>
          <Link
            onClick={toggleBurger}
            className="nav-btn"
            activeClassName="nav-btn--active"
            to={"/app/" + signIn.slug}
          >
            {signIn.name}
          </Link>
          <Link
            onClick={toggleBurger}
            className="nav-btn"
            activeClassName="nav-btn--active"
            to={"/app/" + signUp.slug}
          >
            {signUp.name}
          </Link>
        </>
      )}

      <div className="mobile-menu-bg" onClick={toggleBurger}></div>
    </div>
  )
}

export default MobileMenu
