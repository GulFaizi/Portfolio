import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { motion } from 'framer-motion';
import profileImg from '../../assets/profile.jpg';

const About = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        api.get('/content/profile')
            .then(res => { if (res.data.length > 0) setProfile(res.data[0]); })
            .catch(err => console.error(err));
    }, []);

    if (!profile) return null;

    return (
        <section id="about" className="about-section">
            <div className="section-content">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    About Me
                </motion.h2>
                <div className="about-grid">
                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p>{profile.summary}</p>
                        <p>Hello! My name is {profile.name} and I enjoy creating things that live on the internet. My interest in web development started back in 2014.</p>
                        <p>Fast-forward to today, and I've had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio.</p>
                        <p>Here are a few technologies I've been working with recently:</p>
                        <ul className="tech-list">
                            <li>JavaScript (ES6+)</li>
                            <li>React</li>
                            <li>Node.js</li>
                            <li>Express.js</li>
                            <li>TypeScript</li>
                            <li>Prisma</li>
                            <li>SQL Server</li>
                        </ul>
                    </motion.div>
                    <motion.div
                        className="about-img"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="img-wrapper">
                            <img src={profileImg} alt={profile.name} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
