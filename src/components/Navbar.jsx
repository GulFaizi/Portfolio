import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import resumePdf from '../assets/Gul Ahmad Faizi Resume.pdf';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container nav-container">
                <div className="logo">
                    <Link to="hero" smooth={true} duration={500}>GF.</Link>
                </div>
                <ul className="nav-links">
                    <li><Link to="about" smooth={true} duration={500} offset={-70}>About</Link></li>
                    <li><Link to="skills" smooth={true} duration={500} offset={-70}>Skills</Link></li>
                    <li><Link to="experience" smooth={true} duration={500} offset={-70}>Experience</Link></li>
                    {/* <li><Link to="projects" smooth={true} duration={500} offset={-70}>Projects</Link></li> */}
                    <li><Link to="contact" smooth={true} duration={500} offset={-70}>Contact</Link></li>
                    <li><a href={resumePdf} className="resume-btn" target="_blank" rel="noopener noreferrer" download="Gul_Ahmad_Faizi_Resume.pdf">Resume</a></li>
                    {/* <li><a href="/admin" className="admin-link">Admin</a></li> */}
                </ul>
            </div>
        </motion.nav>
    );
};

export default Navbar;
