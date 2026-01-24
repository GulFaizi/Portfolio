import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';

const Skills = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        api.get('/content/skill')
            .then(res => setSkills(res.data))
            .catch(err => console.error(err));
    }, []);

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        (acc[skill.category] = acc[skill.category] || []).push(skill);
        return acc;
    }, {});

    return (
        <>
            <Header />
            <main className="container page-content">
                <h1>Skills</h1>
                <div className="skills-grid">
                    {Object.keys(groupedSkills).map(category => (
                        <div key={category} className="skill-category">
                            <h3>{category}</h3>
                            <ul className="skill-list">
                                {groupedSkills[category].map(skill => (
                                    <li key={skill.id}>
                                        <span className="skill-name">{skill.name}</span>
                                        {skill.proficiency && <span className="skill-level">{skill.proficiency}%</span>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Skills;
