import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/NavBar.css"

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <h1 >LOGO</h1>
            </div>
            <div className="nav-links">
                <Link to="/home">Home</Link>
                <Link to="/form">Crete Employee</Link>
                <Link to="/table">Employee Table</Link>
               <Link to="/logout">Logout</Link>
               
            </div>
        </nav>
    );
}

export default NavBar;
