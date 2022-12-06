import React from 'react';
import Logo from "../images/logo.png"
import Logout from './Log/Logout';


const Navbar = () => {
    return (
        <nav>
            <div className="nav__container">
                <div className="nav__container__logo">
                 <img className= "nav__container__logo--img" src={ Logo } alt="logo groupomania" />
                 <Logout/>
                </div>
             
            </div>
        </nav>
    );
};

export default Navbar;