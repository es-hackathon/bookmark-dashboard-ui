import React, { Component } from 'react'
import { NavLink, Link } from "react-router-dom";

export default class Header extends Component {
	render() {
    const activeStyle = { color: "#F15B2A" };
    	const { isAuthenticated, login, logout, userHasScopes } = this.props.auth;
    return (
        <nav >
            <ul>
	    	    {isAuthenticated() && (
                <li>
                    <Link to="/home" activestyle={activeStyle}>Home</Link>
                </li>
                )}
                {isAuthenticated() && (
                <li>
                    <Link to="/cards" activestyle={activeStyle}>Cards</Link>
                </li>
                )}
                {isAuthenticated() && (
                <li>
                    <Link to="/groups" activestyle={activeStyle}>Groups</Link>
                </li>
                )} 
                <li>
                    <Link to="/" activestyle={activeStyle}>About</Link>
                </li>
			    <li>
                    <button onClick={isAuthenticated() ? logout : login}>
                        {isAuthenticated() ? "Log Out" : "Log In"}
                    </button>
                </li>
            </ul>
        </nav>
    );
	}
}
