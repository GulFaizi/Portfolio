import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Navbar'; // Using new Navbar
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/ExperienceList'; // Create this next
import Contact from './pages/Contact'; // Reuse or refactor to section
import Admin from './pages/Admin';
import api from './services/api';
import './styles/main.scss';

const MainLayout = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get('/content/profile').then(res => {
      console.log('Profile data:', res.data);
      if (Array.isArray(res.data) && res.data.length > 0) {
        setProfile(res.data[0]);
      } else {
        console.warn('Profile data invalid or empty:', res.data);
      }
    }).catch(err => console.error('Profile fetch error:', err));
  }, []);

  return (
    <div className="app-container">
      <Header />
      <main>
        <Hero profile={profile} />
        <About />
        <Skills />
        <Experience />
        {/* <Projects /> */}
        <section id="contact" style={{ padding: '4rem 0' }}>
          <Contact isSection={true} />
        </section>
      </main>
      <footer className="footer-mini">
        <p>Designed & Built by Gul Ahmad Faizi.</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

