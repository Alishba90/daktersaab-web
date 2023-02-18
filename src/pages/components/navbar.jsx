import React from "react";
import { NavLink } from "react-router-dom";
// import './navbar.css';

const Navbar = () => {
    return (
        <>
            <div className="navbarbg">
                <div className="row">
                    <div className="col-20 ms-auto">
                        <nav className="navbar navbar-expand-lg bg-primary">
                            <div className="container-fluid">
                                <a className="navbar-brand" >DakterSaab</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                    <ul className="navbar-nav ms-auto">
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/">Home</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/about">About</NavLink>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>

            </div>

        </>
    );

}

export default Navbar