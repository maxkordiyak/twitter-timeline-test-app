import React from 'react';
import { NavLink } from 'react-router-dom';

export default ({ logout, isAuthenticated }) => {
    return(
        <div key="user">
            {isAuthenticated ? (
                <div>
                    <NavLink key="logout" to="/" onClick={logout}>Log out</NavLink>
                </div>
            ) : (
                <NavLink key="login" to="/">Log in</NavLink>
            )}
        </div>
    )
};