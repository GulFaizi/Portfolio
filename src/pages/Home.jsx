import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const Home = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/content/profile')
            .then(res => {
                if (res.data && res.data.length > 0) {
                    setProfile(res.data[0]);
                }
            })
            .catch(err => console.error(err));
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <>
            <Header />
            <main className="container home-page">
                <section className="hero">
                    <h1>{profile.name}</h1>
                    <h2>{profile.title}</h2>
                    <p>{profile.summary}</p>
                    <div className="location">{profile.location}</div>
                    <div className="socials">
                        {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                        {profile.github && <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
                    </div>
                </section>
            </main>
        </>
    );
};

export default Home;
