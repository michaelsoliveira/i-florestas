'use client'

import { useState } from 'react';

import { NavLink } from './NavLink';

export { Nav };

function Nav() {
    const [user, setUser] = useState(null);

    function logout() {
        // userService.logout();
    }

    // only show nav when logged in
    if (!user) return null;
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                <a onClick={logout} className="nav-item nav-link">Logout</a>
            </div>
        </nav>
    );
}