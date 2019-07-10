import React from 'react'
import {NavLink} from 'react-router-dom'

import './MobileMenu.scss'

const MobileMenu = ({burgerIsOpen,toggleBurger}) => {
    return (
        <div className={`mobile-menu ${burgerIsOpen && 'open'}`}>
            <NavLink onClick={toggleBurger} className="nav-btn" activeClassName='nav-btn--active' to='/Porady'>
                Porady
        </NavLink>
            <NavLink onClick={toggleBurger} className="nav-btn" activeClassName='nav-btn--active' to='/Przepisy'>
                Przepisy
        </NavLink>
            <NavLink onClick={toggleBurger} className="nav-btn" activeClassName='nav-btn--active' to='/'>
                Zaloguj
        </NavLink>
            <div className="mobile-menu-bg" onClick={toggleBurger}></div>
        </div>
    );
}

export default MobileMenu;
