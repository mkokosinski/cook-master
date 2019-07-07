import React from 'react'
import {
  Link
} from 'react-router-dom'


const Navbar = () => {
    return ( 
        <nav>
            <div className="logo"><Link to='/'> LOGO </Link></div>
            <div className="nav-btn"><Link to='/Porady'> Porady </Link> </div>
            <div className="nav-btn"><Link to='/Przepisy'> Przepisy </Link> </div>
            <div className="nav-btn nav-btn__SignIn">Zaloguj</div>
        </nav>
     );
}
 
export default Navbar;