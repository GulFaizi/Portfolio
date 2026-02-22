import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';

const ExperienceDetail = () => {
    const { id } = useParams();
    const [experience, setExperience] = useState(null);

    useEffect(() => {
        api.get(`/content/experience/${id}`)
            .then(res => setExperience(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!experience) return <div>Loading...</div>;

    const formatDate = (dateStr) => {
        if (!dateStr) return 'Present';
        return new Date(dateStr).toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
    };

    return (
        <>
            <Header />
            <main className="container page-content">
                <h1>{experience.role}</h1>
                <h2>{experience.company}</h2>
                <p className="duration">{formatDate(experience.startDate)} - {formatDate(experience.endDate)}</p>
                <p className="location">{experience.location}</p>

                <section className="details">
                    <h3>Responsibilities & Impact</h3>
                    <ul>
                        {experience.details && experience.details.map(detail => (
                            <li key={detail.id}>{detail.description}</li>
                        ))}
                    </ul>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default ExperienceDetail;
