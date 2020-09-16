import React, { Component } from 'react'
import { NavLink, Link } from "react-router-dom";

const Header = () => {
    const activeStyle = { color: "#F15B2A" };
    return (
        <nav >
            <ul>
                <li>
                    <Link to="/" activestyle={activeStyle}>Home</Link>
                </li>
                <li>
                    <Link to="/cards" activestyle={activeStyle}>Cards</Link>
                </li>
                <li>
                    <Link to="/groups" activestyle={activeStyle}>Groups</Link>
                </li>
                <li>
                    <Link to="/about" activestyle={activeStyle}>About</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Header;