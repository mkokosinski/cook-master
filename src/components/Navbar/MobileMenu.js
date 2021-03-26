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
import { toast } from "react-toastify"

const MobileMenu = ({ burgerIsOpen, toggleBurger, items }) => {
  const { isLoggedIn } = useContext(AuthContext)

  const logOutHandler = () => {
    logOut()
      .then(resp => {
        toggleBurger()
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
            <Link
              className="nav-btn"
              activeClassName="nav-btn--active"
              onClick={logOutHandler}
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
