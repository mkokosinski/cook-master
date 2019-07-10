import React, { useState } from 'react'
import {
  NavLink
} from 'react-router-dom'
// React Component
import Burger from '@animated-burgers/burger-rotate'
// don't forget the styles
import '@animated-burgers/burger-rotate/dist/styles.css'

import './Navbar.scss'
import logo from '../../assets/img/logo.png'
import tipsIco from '../../assets/img/chef.svg'
import recipesIco from '../../assets/img/recipe-book.svg'
import MobileMenu from './MobileMenu';

const Navbar = ({ location }) => {
  const [burgerIsOpen, setBurgerIsOpen] = useState(false)
  const toggleBurger = () => {
    setBurgerIsOpen(!burgerIsOpen)
  }
  return (
    <>
      <nav>
        <NavLink onClick={burgerIsOpen ? toggleBurger : null} className="nav-logo" to='/'>
          <img src={logo} alt="Logo" />
        </NavLink>
        <div className="nav-buttons-container">
          <NavLink className="nav-btn" activeClassName='nav-btn--active' to='/Porady'>
            <div className="nav-btn__ico">
              <img src={tipsIco} alt="Ico" />
            </div>
            <div className="nav-btn__txt">Porady</div>
          </NavLink>

          <NavLink activeClassName='nav-btn--active' className="nav-btn" to='/Przepisy'>
            <div className="nav-btn__ico">
              <img src={recipesIco} alt="Ico" />
            </div>
            <div className="nav-btn__txt">Przepisy</div>
          </NavLink>
          <NavLink className="nav-btn--SignIn" to='/' >Zaloguj</NavLink>
        </div>
        <Burger onClick={toggleBurger} isOpen={burgerIsOpen} />
      </nav>
     <MobileMenu toggleBurger={toggleBurger} burgerIsOpen={burgerIsOpen}/>
    </>
  );
}

export default Navbar;