import { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck } from 'react-icons/fi';
import './Contact.css';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [location, setLocation] = useState({ lat: 18.910, lng: 73.951 }); // Default to nearby location

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    console.log("Using default location", error);
                }
            );
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="page-wrapper contact-page">
            <div className="contact-header">
                <div className="container">
                    <h1 className="section-title">Contact Us</h1>
                    <p className="section-subtitle">Have a query? Reach out to us through any of the channels below.</p>
                </div>
            </div>

            <div className="container">
                <div className="contact-grid">
                    {/* Contact Info */}
                    <div className="contact-info-section">
                        <div className="contact-card glass-card">
                            <div className="contact-card-icon"><FiMapPin /></div>
                            <div>
                                <h3>Government Polytechnic Awasari (Kh.)</h3>
                                <p>Awasari (Kh.), Maharashtra, India</p>
                                <p className="contact-codes">DTE Code: 6011 | MSBTE Code: 1051</p>
                            </div>
                        </div>

                        <div className="contact-card glass-card">
                            <div className="contact-card-icon"><FiMail /></div>
                            <div>
                                <h3>Email</h3>
                                <a href="mailto:gpawasari@gmail.com">gpawasari@gmail.com</a>
                            </div>
                        </div>

                        <div className="contact-card glass-card">
                            <div className="contact-card-icon"><FiPhone /></div>
                            <div>
                                <h3>Phone</h3>
                                <a href="tel:9970723236">9970723236</a>
                            </div>
                        </div>

                        {/* Map */}
                        {/* Map - Dynamic Location */}
                        <div className="location-info-card" style={{
                            border: '1px solid #ddd',
                            background: 'white',
                            padding: '15px',
                            borderRadius: '12px',
                            marginTop: '20px'
                        }}>
                            <div style={{ padding: '0 0 15px 0', borderBottom: '1px solid #ddd', marginBottom: '15px' }}>
                                <h2 style={{ margin: 0, color: '#003366', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                                    <FiMapPin className="text-red-500" style={{ color: '#dc3545' }} /> Location
                                </h2>
                            </div>

                            <div style={{
                                width: '100%',
                                height: '250px',
                                background: '#eef',
                                border: '1px solid #ddd',
                                marginBottom: '15px',
                                position: 'relative'
                            }}>
                                <iframe
                                    title="User Location"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                    src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    width: '100%',
                                    padding: '12px 20px',
                                    background: 'white',
                                    color: '#003366',
                                    fontWeight: '700',
                                    border: '1px solid #003366',
                                    textDecoration: 'none',
                                    textTransform: 'uppercase',
                                    fontSize: '0.9rem',
                                    transition: 'background 0.2s',
                                    cursor: 'pointer',
                                    borderRadius: '6px'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = '#f0f4f8'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; }}
                            >
                                <FiMapPin /> OPEN IN GOOGLE MAPS
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-section glass-card">
                        <h2>Send us a Message</h2>
                        <p className="form-desc">Fill out the form below and we'll get back to you shortly.</p>

                        {submitted && (
                            <div className="submit-success">
                                <FiCheck /> Message sent successfully!
                            </div>
                        )}

                        <form onSubmit={handleSubmit} id="contact-form">
                            <div className="form-group">
                                <label htmlFor="contact-name">Full Name</label>
                                <input
                                    type="text"
                                    id="contact-name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact-email">Email Address</label>
                                <input
                                    type="email"
                                    id="contact-email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact-subject">Subject</label>
                                <input
                                    type="text"
                                    id="contact-subject"
                                    placeholder="What's this about?"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact-message">Message</label>
                                <textarea
                                    id="contact-message"
                                    placeholder="Type your message here..."
                                    rows="5"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-accent" id="contact-submit-btn">
                                <FiSend /> Send Message
                            </button>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    );
}
