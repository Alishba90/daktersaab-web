// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Import the CSS file
import logo from '../images/logo.png'; // Import the logo image


const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <div>
                    <a href='#' className="logo">
                        <img src={logo} alt="Logo" className="logoimg"/>
                        <h1 className="appname">Dakter saab</h1>
                    </a>
                </div>
                <div className='links'>
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className="nav-link">
                        About
                    </Link>
                </li>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;
