import React, { useState, useEffect, useContext } from "react"
import { Link } from "gatsby"
import cx from "classnames"

// React Component
import Burger from "@animated-burgers/burger-rotate"
// don't forget the styles
import "@animated-burgers/burger-rotate/dist/styles.css"

import "./Navbar.scss"
import Logo from "../Logo/Logo"
import tipsIco from "../../images/chef.svg"
import recipesIco from "../../images/recipe-book.svg"
import MobileMenu from "./MobileMenu"
import { logOut, AuthContext } from "../../services/auth"
import { tips, recipes, signIn, signUp, signOut } from "../../helpers/menuLinks"

const Navbar = ({ location, items }) => {
  const [burgerIsOpen, setBurgerIsOpen] = useState(false)
  const [isScrolledDown, setIsScrolledDown] = useState(false)

  const { isLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler)
    return () => {
      window.removeEventListener("scroll", onScrollHandler)
    }
  }, [])

  const onScrollHandler = e => {
    if (window.scrollY > 120) {
      setIsScrolledDown(true)
    }
    if (window.scrollY <= 12) {
      setIsScrolledDown(false)
    }
  }
  const toggleBurger = () => {
    setBurgerIsOpen(!burgerIsOpen)
  }

  const navCx = cx({ "is-scrolled-down": isScrolledDown })
  return (
    <>
      <nav className={navCx}>
        <Link
          onClick={burgerIsOpen ? toggleBurger : null}
          className={"nav-logo"}
          to="/app/"
        >
          <div className="logo">
          <Logo />
          </div>
        </Link>
        <div className="nav-buttons-container">
          <Link
            className="nav-btn"
            activeClassName="nav-btn--active"
            to={"/app/" + tips.slug}
          >
            <div className="nav-btn__ico">
              <img src={tipsIco} alt="Ico" />
            </div>
            <div className="nav-btn__txt">{tips.name}</div>
          </Link>

          <Link
            activeClassName="nav-btn--active"
            className="nav-btn"
            to={"/app/" + recipes.slug}
          >
            <div className="nav-btn__ico">
              <img src={recipesIco} alt="Ico" />
            </div>
            <div className="nav-btn__txt">{recipes.name}</div>
          </Link>
          {isLoggedIn ? (
            <Link
              className="nav-btn--SignIn"
              to={"/app/" + signOut.slug}
              onClick={logOut}
            >
              {signOut.name}
            </Link>
          ) : (
            <>
              <Link className="nav-btn--SignIn" to={"/app/" + signIn.slug}>
                {signIn.name}
              </Link>
              <Link className="nav-btn--SignIn" to={"/app/" + signUp.slug}>
                {signUp.name}
              </Link>
            </>
          )}
        </div>
        <Burger onClick={toggleBurger} isOpen={burgerIsOpen} />
      </nav>
      <MobileMenu toggleBurger={toggleBurger} burgerIsOpen={burgerIsOpen} />
    </>
  )
}

export default Navbar
