import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck } from 'react-icons/fi';
import './Contact.css';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

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
                        <div className="contact-map">
                            <h3>📍 Location</h3>
                            <div className="map-container">
                                <iframe
                                    title="Government Polytechnic Awasari Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.0!2d73.9!3d18.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGovernment+Polytechnic+Awasari!5e0!3m2!1sen!2sin!4v1234567890"
                                    width="100%"
                                    height="250"
                                    style={{ border: 0, borderRadius: '12px' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                            <a
                                href="https://maps.google.com/?q=Government+Polytechnic+Awasari+Kh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline btn-sm map-link"
                            >
                                <FiMapPin /> Open in Google Maps
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
