import React from 'react';
import '../styles/main.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container" style={{ textAlign: 'center', padding: '2rem 0', marginTop: '2rem', borderTop: '1px solid #ddd' }}>
                <p>&copy; {new Date().getFullYear()} Gul Ahmad Faizi. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
