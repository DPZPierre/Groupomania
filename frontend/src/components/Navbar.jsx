import React from 'react';
// import { NavLink } from 'react-router-dom';
import Logo from "../images/logo.png"


const Navbar = () => {
    return (
        <nav>
            <div className="nav__container">
                {/* <NavLink to="/">Home</NavLink> */}
                <div className="nav__container__logo">
                 <img src={ Logo } alt="logo groupomania" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;