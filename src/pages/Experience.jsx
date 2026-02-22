import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';

const Experience = () => {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        api.get('/content/experience')
            .then(res => {
                console.log('Experience page data:', res.data);
                if (Array.isArray(res.data)) {
                    setExperiences(res.data);
                } else {
                    console.error('Experience page: API returned non-array:', res.data);
                    setExperiences([]);
                }
            })
            .catch(err => console.error('Experience page fetch error:', err));
    }, []);

    const formatDate = (dateStr) => {
        if (!dateStr) return 'Present';
        return new Date(dateStr).toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
    };

    return (
        <>
            <Header />
            <main className="container page-content">
                <h1>Work Experience</h1>
                <div className="experience-list">
                    {experiences.map(exp => (
                        <div key={exp.id} className="experience-card">
                            <h2>{exp.role}</h2>
                            <h3>{exp.company}</h3>
                            <p className="duration">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                            <p className="location">{exp.location}</p>
                            <p>{exp.summary}</p>
                            <Link to={`/experience/${exp.id}`} className="btn btn-primary">View Details</Link>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Experience;
