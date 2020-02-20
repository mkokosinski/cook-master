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
          <Link
            onClick={toggleBurger}
            className="nav-btn"
            activeClassName="nav-btn--active"
            to={"/" + signOut.slug}
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
            to={"/" + signIn.slug}
          >
            {signIn.name}
          </Link>
          <Link
            onClick={toggleBurger}
            className="nav-btn"
            activeClassName="nav-btn--active"
            to={"/" + signUp.slug}
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
