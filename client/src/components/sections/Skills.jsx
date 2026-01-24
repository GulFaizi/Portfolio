import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { getSkillIcon } from '../../utils/iconMapper.jsx';
import { motion } from 'framer-motion';

const Skills = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        api.get('/content/skill')
            .then(res => setSkills(res.data))
            .catch(err => console.error(err));
    }, []);

    // Deduplicate skills by name
    const uniqueSkills = [...new Map((skills || []).map(item => [item.name, item])).values()];

    const groupedSkills = uniqueSkills.reduce((acc, skill) => {
        (acc[skill.category] = acc[skill.category] || []).push(skill);
        return acc;
    }, {});

    return (
        <section id="skills" className="skills-section">
            <h2 className="section-title">Skills & Technologies</h2>
            <div className="skills-container">
                {Object.keys(groupedSkills).map((category, idx) => (
                    <motion.div
                        key={category}
                        className="skill-category-card"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h3>{category}</h3>
                        <div className="skill-icons-grid">
                            {groupedSkills[category].map(skill => (
                                <div key={skill.id} className="skill-item">
                                    <div className="skill-icon">
                                        {getSkillIcon(skill.name) || <div className="placeholder-icon">{skill.name[0]}</div>}
                                    </div>
                                    <span className="skill-name">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
