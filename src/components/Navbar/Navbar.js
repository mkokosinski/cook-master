import React, { useState } from 'react'
import { Link } from "gatsby"


// React Component
import Burger from '@animated-burgers/burger-rotate'
// don't forget the styles
import '@animated-burgers/burger-rotate/dist/styles.css'

import './Navbar.scss'
import logo from '../../images/logo.png'
import tipsIco from '../../images/chef.svg'
import recipesIco from '../../images/recipe-book.svg'
import MobileMenu from './MobileMenu';

const Navbar = ({ location }) => {
  const [burgerIsOpen, setBurgerIsOpen] = useState(false)
  const toggleBurger = () => {
    setBurgerIsOpen(!burgerIsOpen)
  }
  return (
    <>
      <nav>
        <Link onClick={burgerIsOpen ? toggleBurger : null} className="nav-logo" to='/'>
          <img src={logo} alt="Logo" />
        </Link>
        <div className="nav-buttons-container">
          <Link className="nav-btn" activeClassName='nav-btn--active' to='/Tips'>
            <div className="nav-btn__ico">
              <img src={tipsIco} alt="Ico" />
            </div>
            <div className="nav-btn__txt">Porady</div>
          </Link>

          <Link activeClassName='nav-btn--active' className="nav-btn" to='/Recipes'>
            <div className="nav-btn__ico">
              <img src={recipesIco} alt="Ico" />
            </div>
            <div className="nav-btn__txt">Przepisy</div>
          </Link>
          <Link className="nav-btn--SignIn" to='/' >Zaloguj</Link>
        </div>
        <Burger onClick={toggleBurger} isOpen={burgerIsOpen} />
      </nav>
     <MobileMenu toggleBurger={toggleBurger} burgerIsOpen={burgerIsOpen}/>
    </>
  );
}

export default Navbar;