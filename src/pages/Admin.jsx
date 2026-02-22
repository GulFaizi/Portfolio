import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', credentials);
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            setError('');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    const handleLogout = () => {
        api.post('/auth/logout');
        localStorage.removeItem('token');
        setToken('');
    };

    if (!token) {
        return (
            <>
                <Header />
                <main className="container page-content">
                    <h1>Admin Login</h1>
                    <form onSubmit={handleLogin} className="login-form">
                        {error && <p className="error">{error}</p>}
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" name="username" value={credentials.username} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" value={credentials.password} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="container page-content">
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout} className="btn">Logout</button>
                <p>Welcome, Admin. Use the API or implement forms here to manage content.</p>
                {/* CMS implementation would go here (Forms to add/edit content) */}
                <div className="dashboard-actions">
                    <p>CMS Features (To be implemented):</p>
                    <ul>
                        <li>Add/Edit Experience</li>
                        <li>Add/Edit Skills</li>
                        <li>Manage Profile</li>
                    </ul>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Admin;
