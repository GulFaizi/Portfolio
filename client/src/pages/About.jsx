import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';

const About = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        api.get('/content/profile')
            .then(res => {
                if (res.data && res.data.length > 0) setProfile(res.data[0]);
            })
            .catch(err => console.error(err));
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <>
            <Header />
            <main className="container page-content">
                <h1>About Me</h1>
                <div className="about-content">
                    <p>{profile.summary}</p>
                    <div className="info">
                        <p><strong>Location:</strong> {profile.location}</p>
                        <p><strong>Email:</strong> <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
                        {profile.linkedin && <p><strong>LinkedIn:</strong> <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">Profile</a></p>}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default About;
