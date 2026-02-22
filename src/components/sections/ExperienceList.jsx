import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { motion } from 'framer-motion';

const ExperienceList = () => {
    const [experiences, setExperiences] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        api.get('/content/experience')
            .then(res => {
                if (Array.isArray(res.data)) {
                    // Deduplicate based on company and role
                    const uniqueExp = res.data.filter((v, i, a) => a.findIndex(t => (t.company === v.company && t.role === v.role)) === i);
                    setExperiences(uniqueExp);
                } else {
                    setExperiences([]);
                }
            })
            .catch(err => console.error(err));
    }, []);

    if (experiences.length === 0) return null;

    return (
        <section id="experience" className="experience-section">
            <h2 className="section-title">Where I've Worked</h2>
            <div className="experience-tabs-container">
                <div className="tabs-list">
                    {experiences.map((exp, idx) => (
                        <button
                            key={exp.id}
                            className={`tab-btn ${activeTab === idx ? 'active' : ''}`}
                            onClick={() => setActiveTab(idx)}
                        >
                            {exp.company}
                        </button>
                    ))}
                </div>
                <div className="tab-content">
                    {/* Content for the active tab */}
                    {experiences[activeTab] && (
                        <motion.div
                            key={experiences[activeTab].id} // Use ID for key to trigger animation on change
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3>
                                <span>{experiences[activeTab].role}</span>
                                <span className="company-name"> @ {experiences[activeTab].company}</span>
                            </h3>
                            <p className="exp-range">
                                {new Date(experiences[activeTab].startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })} -
                                {experiences[activeTab].endDate ? new Date(experiences[activeTab].endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Present'}
                            </p>
                            <ul className="exp-details">
                                {experiences[activeTab].details && experiences[activeTab].details.map(detail => (
                                    <li key={detail.id}>{detail.description}</li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ExperienceList;
