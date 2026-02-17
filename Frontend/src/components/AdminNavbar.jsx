import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import './Navbar.css';

export default function AdminNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="gov-header-wrapper">
            {/* Top Header Section - Kept identical */}
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

            {/* Navigation Bar - Content Removed but Bar Preserved */}
            <nav className={`gov-navbar ${mobileOpen ? 'open' : ''}`}>
                <div className="container navbar-container">
                    <ul className="nav-links">
                        {/* Empty list item to maintain height */}
                        <li className="nav-link" style={{ visibility: 'hidden' }}>&nbsp;</li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
