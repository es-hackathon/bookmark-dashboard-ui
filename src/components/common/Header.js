import React, { Component } from 'react'
import { NavLink, Link } from "react-router-dom";

const Header = () => {
    const activeStyle = { color: "#F15B2A" };
    return (
        <nav >
            <ul>
                <li>
                    <Link to="/" activeStyle={activeStyle}>Home</Link>
                </li>
                <li>
                    <Link to="/cards" activeStyle={activeStyle}>Cards</Link>
                </li>
                <li>
                    <Link to="/groups" activeStyle={activeStyle}>Groups</Link>
                </li>
                <li>
                    <Link to="/about" activeStyle={activeStyle}>About</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Header;