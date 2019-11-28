import React from "react"
import { Link } from "gatsby"
import {home, tips,recipes,signIn, addRecipe} from '../helpers/menuLinks'

import "./MobileMenu.scss"


const MobileMenu = ({ burgerIsOpen, toggleBurger, items }) => {
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
      <Link
        onClick={toggleBurger}
        className="nav-btn"
        activeClassName="nav-btn--active"
        to={"/app/" + addRecipe.slug}
        >
          {addRecipe.name}
      </Link>
      <div className="mobile-menu-bg" onClick={toggleBurger}></div>
    </div>
  )
}

export default MobileMenu
