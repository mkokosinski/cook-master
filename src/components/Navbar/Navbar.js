import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import cx from "classnames"
import Burger from "@animated-burgers/burger-rotate"

import Logo from "../Logo/Logo"
import TipsIco from "../../images/chef.svg"
import RecipesIco from "../../images/recipe-book.svg"
import MobileMenu from "./MobileMenu"
import { tips, recipes } from "../../helpers/menuLinks"
import { UserProfileButton } from "../UserProfile/ProfileButton"

import "@animated-burgers/burger-rotate/dist/styles.css"
import "./Navbar.scss"

const Navbar = ({ location, items }) => {
  const [burgerIsOpen, setBurgerIsOpen] = useState(false)
  const [isScrolledDown, setIsScrolledDown] = useState(false)

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
          to="/"
        >
          <div className="logo">
            <Logo template="color" />
          </div>
        </Link>
        <div className="nav-buttons-container">
          <Link
            className="nav-btn"
            activeClassName="nav-btn--active"
            to={"/" + tips.slug}
          >
            <div className="nav-btn__ico">
              <TipsIco />
            </div>
            <div className="nav-btn__txt">{tips.name}</div>
          </Link>

          <Link
            activeClassName="nav-btn--active"
            className="nav-btn"
            to={"/" + recipes.slug}
          >
            <div className="nav-btn__ico">
              <RecipesIco />
            </div>
            <div className="nav-btn__txt">{recipes.name}</div>
          </Link>

          <div className="nav-btn" activeClassName="nav-btn--active">
            <div className="nav-btn__ico">
              <UserProfileButton />
            </div>
            <div className="nav-btn__txt">Profil</div>
          </div>
        </div>

        <Burger onClick={toggleBurger} isOpen={burgerIsOpen} />
      </nav>
      <MobileMenu toggleBurger={toggleBurger} burgerIsOpen={burgerIsOpen} />
    </>
  )
}

export default Navbar
