import React, { useState, useEffect, useContext } from "react"
import { Link } from "gatsby"
import cx from "classnames"
import "@animated-burgers/burger-rotate/dist/styles.css"
import Burger from "@animated-burgers/burger-rotate"

import Logo from "../Logo/Logo"
import TipsIco from "../../images/chef.svg"
import RecipesIco from "../../images/recipe-book.svg"
import AddRecipeIco from "../../images/addRecipe.svg"
import MobileMenu from "./MobileMenu"
import {
  tips,
  recipes,
  signUp,
  signIn,
  signOut,
  addRecipe,
} from "../../helpers/menuLinks"
import { UserProfileButton } from "../UserProfile/ProfileButton"
import { AuthContext, logOut } from "../../services/auth"

import "./Navbar.scss"
import { useLocation } from "@reach/router"
import { toast } from "react-toastify"

const Navbar = ({ items }) => {
  const [burgerIsOpen, setBurgerIsOpen] = useState(false)
  const [isScrolledDown, setIsScrolledDown] = useState(false)

  const location = useLocation()
  const auth = useContext(AuthContext)

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

  const logOutHandler = () => {
    logOut()
      .then(resp => {
        toast.success("Poprawnie wylogowano", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        })
      })
      .catch(err => {
        console.error(err)
        toast.error("Nie udało się wylogować, szczegóły w konsoli...", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        })
      })
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

          {auth.isLoggedIn ? (
            <>
              <Link
                className="nav-btn"
                activeClassName="nav-btn--active"
                to={"/" + addRecipe.slug}
              >
                <div className="nav-btn__ico">
                  <AddRecipeIco />
                </div>
                <div className="nav-btn__txt">{addRecipe.name}</div>
              </Link>
              <div
                className="nav-btn"
                activeClassName="nav-btn--active"
                onClick={logOutHandler}
              >
                <div className="nav-btn__ico">
                  <UserProfileButton />
                </div>
                <div className="nav-btn__txt"> {signOut.name}</div>
              </div>
            </>
          ) : (
            <Link
              className="nav-btn"
              activeClassName="nav-btn--active"
              to={"/" + signIn.slug}
              state={{ from: location.pathname }}
            >
              <div className="nav-btn__ico">
                <UserProfileButton />
              </div>
              <div className="nav-btn__txt"> {signIn.name}</div>
            </Link>
          )}
        </div>

        <Burger onClick={toggleBurger} isOpen={burgerIsOpen} />
      </nav>
      <MobileMenu
        toggleBurger={toggleBurger}
        logOutHandler={logOutHandler}
        burgerIsOpen={burgerIsOpen}
      />
    </>
  )
}

export default Navbar
