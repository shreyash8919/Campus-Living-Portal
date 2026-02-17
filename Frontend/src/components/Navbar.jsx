import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import './Navbar.css';

export default function Navbar({ isDashboard = false }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const { isAuthenticated, userType, logout, user } = useAuth();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="gov-header-wrapper">
            {/* Top Header Section */}
            <header className="gov-header">
                <div className="container header-container">
                    <div className="header-left">
                        <div className="brand-logo">
                            <img
                                src={logo}
                                alt="Government Polytechnic Awasari Seal"
                                className="college-logo"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="logo-placeholder" style={{ display: 'none' }}>
                                <span>GPA</span>
                            </div>
                        </div>
                        <div className="brand-text">
                            <h1 className="brand-name">Government Polytechnic, Awasari (Kh.)</h1>
                            <p className="brand-sub">शासकीय तंत्रनिकेतन, अवसरी (खु.)</p>
                        </div>
                    </div>

                    <div className="header-right">
                        <div className="contact-item">
                            <span className="contact-label">Email:</span>
                            {<p>gpawasari@gmail.com</p>}
                        </div>
                        <div className="contact-item">
                            <span className="contact-label">Phone:</span>
                            <p>9970723236</p>
                        </div>
                    </div>

                    <button
                        className="mobile-toggle"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle navigation"
                    >
                        ☰
                    </button>
                </div>
            </header>

            {/* Navigation Bar */}
            <nav className={`gov-navbar ${mobileOpen ? 'open' : ''}`}>
                <div className="container navbar-container">
                    <ul className="nav-links">
                        {!isDashboard ? (
                            <>
                                <li><Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>Home</Link></li>
                                <li><Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>About Us</Link></li>
                                <li><Link to="/notices" className={`nav-link ${isActive('/notices') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>Notices</Link></li>
                                <li><Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>Contact</Link></li>
                                <li><Link to="/login" className="nav-link login-link" onClick={() => setMobileOpen(false)}>Login</Link></li>
                            </>
                        ) : (
                            <li className="nav-link" style={{ visibility: 'hidden' }}>&nbsp;</li>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
}
