import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = ({ isSection }) => {
    // We can still fetch profile for other things, but user provided static data to use.
    // Displaying hardcoded values as requested for accuracy.

    const content = (
        <div className={`container page-content ${isSection ? 'contact-section-inner' : ''}`}>
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                Get In Touch
            </motion.h2>
            <p className="contact-text">
                I am currently looking for new opportunities. Whether you have a question or just want to say hi, reach out easily!
            </p>

            <div className="contact-details" style={{ textAlign: 'center', marginTop: '2rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ color: '#64ffda', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Email:</h3>
                    <a href="mailto:gulahmadfaizi1987@gmail.com" style={{ fontSize: '1.5rem', fontFamily: 'monospace' }}>gulahmadfaizi1987@gmail.com</a>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ color: '#64ffda', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Cell Number:</h3>
                    <p style={{ fontSize: '1.2rem', fontFamily: 'monospace' }}>+1 343 558 4733</p>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ color: '#64ffda', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Links:</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                        <a href="https://www.linkedin.com/in/gul-ahmad-faizi/" target="_blank" rel="noopener noreferrer" style={{ color: '#64ffda', fontSize: '2.5rem', transition: 'transform 0.2s' }} onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'} onMouseOut={(e) => e.target.style.transform = 'translateY(0)'} aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                        <a href="https://github.com/GulFaizi" target="_blank" rel="noopener noreferrer" style={{ color: '#64ffda', fontSize: '2.5rem', transition: 'transform 0.2s' }} onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'} onMouseOut={(e) => e.target.style.transform = 'translateY(0)'} aria-label="GitHub">
                            <FaGithub />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );

    if (isSection) return content;

    return (
        <>
            <Header />
            <main>{content}</main>
            <Footer />
        </>
    );
};

export default Contact;
