import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import cx from 'classnames'

// React Component
import Burger from "@animated-burgers/burger-rotate"
// don't forget the styles
import "@animated-burgers/burger-rotate/dist/styles.css"

import "./Navbar.scss"
import logo from "../../images/logo.png"
import tipsIco from "../../images/chef.svg"
import recipesIco from "../../images/recipe-book.svg"
import MobileMenu from "./MobileMenu"
import { isLoggedIn } from "../../services/auth"

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

  const navCx = cx({'is-scrolled-down': isScrolledDown})
  return (
    <>
      <nav className={navCx}>
        <Link
          onClick={burgerIsOpen ? toggleBurger : null}
          className={'nav-logo'}
          to="/app/"
        >
          <img src={logo} alt="Logo" />
        </Link>
        <div className="nav-buttons-container">
          <Link
            className="nav-btn"
            activeClassName="nav-btn--active"
            to="/app/Tips"
          >
            <div className="nav-btn__ico">
              <img src={tipsIco} alt="Ico" />
            </div>
            <div className="nav-btn__txt">Porady</div>
          </Link>

          <Link
            activeClassName="nav-btn--active"
            className="nav-btn"
            to="/app/Recipes"
          >
            <div className="nav-btn__ico">
              <img src={recipesIco} alt="Ico" />
            </div>
            <div className="nav-btn__txt">Przepisy</div>
          </Link>
          {isLoggedIn() ? (
            <Link className="nav-btn--SignIn" to="/app//AddRecipe">
              Dodaj przepis
            </Link>
          ) : (
            <Link className="nav-btn--SignIn" to="/app/">
              Zaloguj
            </Link>
          )}
        </div>
        <Burger onClick={toggleBurger} isOpen={burgerIsOpen} />
      </nav>
      <MobileMenu toggleBurger={toggleBurger} burgerIsOpen={burgerIsOpen} />
    </>
  )
}

export default Navbar
