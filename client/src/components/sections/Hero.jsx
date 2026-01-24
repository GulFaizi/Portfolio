import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const Hero = ({ profile }) => {
    // if (!profile) return null; // Removed to allow fallback rendering

    return (
        <section id="hero" className="hero-section">
            <div className="container">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="hero-subtitle"
                >
                    Hi, my name is
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="hero-title"
                >
                    {profile?.name || 'Your Name'}.
                </motion.h1>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="hero-role"
                >
                    I build things for the web.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="hero-desc"
                >
                    {profile?.summary || 'Software Engineer based in ...'}
                </motion.p>
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="hero-cta"
                >
                    <Link to="projects" smooth={true} duration={500} className="btn btn-outline">
                        Check out my work!
                    </Link>
                </motion.div> */}
            </div>
        </section>
    );
};

export default Hero;
