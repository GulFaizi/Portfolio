import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/content/project')
            .then(res => setProjects(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section id="projects" className="projects-section">
            <h2 className="section-title">Some Things I've Built</h2>
            <div className="projects-grid">
                {(projects || []).map((project, i) => (
                    <motion.div
                        key={project.id}
                        className="project-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="project-content">
                            <div className="project-top">
                                <div className="folder-icon">📂</div>
                                <div className="project-links">
                                    {project.repoLink && <a href={project.repoLink} target="_blank" rel="noopener noreferrer"><FiGithub /></a>}
                                    {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer"><FiExternalLink /></a>}
                                </div>
                            </div>
                            <h3 className="project-title">{project.title}</h3>
                            <div className="project-desc">
                                <p>{project.description}</p>
                            </div>
                            <ul className="project-tech">
                                {project.technologies.split(',').map((tech, idx) => (
                                    <li key={idx}>{tech.trim()}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
