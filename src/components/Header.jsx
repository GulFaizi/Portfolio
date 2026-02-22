import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.scss';

const Header = () => {
    return (
        <header className="header">
            <div className="container header-container">
                <div className="logo">
                    <Link to="/">Gul Ahmad Faizi</Link>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/experience">Experience</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
