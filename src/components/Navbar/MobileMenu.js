import React from "react"
import { Link } from "gatsby"

import "./MobileMenu.scss"

const MobileMenu = ({ burgerIsOpen, toggleBurger }) => {
  return (
    <div className={`mobile-menu ${burgerIsOpen && "open"}`}>
      <Link
        onClick={toggleBurger}
        className="nav-btn"
        activeClassName="nav-btn--active"
        to="/Tips"
      >
        Porady
      </Link>
      <Link
        onClick={toggleBurger}
        className="nav-btn"
        activeClassName="nav-btn--active"
        to="/Recipes"
      >
        Przepisy
      </Link>
      <Link
        onClick={toggleBurger}
        className="nav-btn"
        activeClassName="nav-btn--active"
        to="/"
      >
        Zaloguj
      </Link>
      <div className="mobile-menu-bg" onClick={toggleBurger}></div>
    </div>
  )
}

export default MobileMenu
