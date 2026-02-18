import { useState, useEffect } from 'react';
import { FiCalendar, FiMapPin, FiPhone, FiFileText, FiUpload, FiClock, FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './StudentPages.css';

export default function LeavePage() {
    const { user } = useAuth();
    const [leaves, setLeaves] = useState([]);
    const [formData, setFormData] = useState({
        fromDate: '',
        toDate: '',
        leaveType: '',
        reason: '',
        destinationAddress: '',
        parentContact: ''
    });
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const res = await fetch('http://localhost:5000/api/leave/my-leaves', {
                headers: { 'auth-token': token }
            });
            const data = await res.json();
            if (res.ok) {
                setLeaves(data);
            }
        } catch (error) {
            console.error('Error fetching leaves:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setDocument(e.target.files[0]);
    };

    const calculateDays = () => {
        if (formData.fromDate && formData.toDate) {
            const start = new Date(formData.fromDate);
            const end = new Date(formData.toDate);
            if (end < start) return 0;
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            return diffDays;
        }
        return 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (!formData.fromDate || !formData.toDate || !formData.leaveType || !formData.reason || !formData.destinationAddress || !formData.parentContact) {
            setMessage({ type: 'error', text: 'Please fill in all required fields.' });
            return;
        }

        if (new Date(formData.toDate) < new Date(formData.fromDate)) {
            setMessage({ type: 'error', text: 'To Date cannot be before From Date.' });
            return;
        }

        if (!/^[0-9]{10}$/.test(formData.parentContact)) {
            setMessage({ type: 'error', text: 'Parent contact number must be 10 digits.' });
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');

            // Create FormData
            const submitData = new FormData();
            submitData.append('fromDate', formData.fromDate);
            submitData.append('toDate', formData.toDate);
            submitData.append('leaveType', formData.leaveType);
            submitData.append('reason', formData.reason);
            submitData.append('destinationAddress', formData.destinationAddress);
            submitData.append('parentContact', formData.parentContact);
            if (document) {
                submitData.append('document', document);
            }

            const res = await fetch('http://localhost:5000/api/leave/apply', {
                method: 'POST',
                headers: {
                    'auth-token': token
                },
                body: submitData
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: 'Leave Request Submitted Successfully' });
                setFormData({
                    fromDate: '',
                    toDate: '',
                    leaveType: '',
                    reason: '',
                    destinationAddress: '',
                    parentContact: ''
                });
                setDocument(null);
                if (window.document.getElementById('fileInput')) {
                    window.document.getElementById('fileInput').value = '';
                }
                fetchLeaves();

                // Auto hide success message
                setTimeout(() => {
                    setMessage({ type: '', text: '' });
                }, 4000);
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to submit leave request' });
            }
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Server error. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
        };

        switch (status) {
            case 'Approved':
                return <span style={{ ...styles, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><FiCheckCircle /> Approved</span>;
            case 'Rejected':
                return <span style={{ ...styles, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}><FiXCircle /> Rejected</span>;
            default:
                return <span style={{ ...styles, background: 'rgba(234, 179, 8, 0.1)', color: '#eab308' }}><FiClock /> Pending</span>;
        }
    };

    return (
        <div className="sp-page animate-fade-in">
            <h1 className="sp-title">Leave Application</h1>
            <p className="sp-subtitle">Apply for leave and track your application status.</p>

            <div className="sp-section">
                <div className="sp-section-header">
                    <span>New Leave Request</span>
                    <FiCalendar />
                </div>

                {message.text && (
                    <div style={{
                        marginBottom: '20px',
                        padding: '12px',
                        borderRadius: '8px',
                        background: message.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: message.type === 'error' ? '#ef4444' : '#10b981',
                        border: `1px solid ${message.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        animation: 'fadeIn 0.3s ease-in-out'
                    }}>
                        {message.type === 'error' ? <FiAlertCircle size={18} /> : <FiCheckCircle size={18} />}
                        <span style={{ fontWeight: 500 }}>{message.text}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="sp-fields-grid">
                        <div className="sp-field">
                            <label>From Date</label>
                            <input
                                type="date"
                                name="fromDate"
                                value={formData.fromDate}
                                onChange={handleChange}
                                required
                                style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
                            />
                        </div>
                        <div className="sp-field">
                            <label>To Date</label>
                            <input
                                type="date"
                                name="toDate"
                                value={formData.toDate}
                                onChange={handleChange}
                                required
                                style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
                            />
                        </div>

                        <div className="sp-field full-width">
                            <label>Total Days</label>
                            <div style={{ padding: '10px 12px', background: 'var(--bg-elevated)', borderRadius: '6px', border: '1px solid var(--border-color)', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                                {calculateDays()} Days
                            </div>
                        </div>

                        <div className="sp-field">
                            <label>Leave Type</label>
                            <select
                                name="leaveType"
                                value={formData.leaveType}
                                onChange={handleChange}
                                required
                                style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
                            >
                                <option value="">Select Type</option>
                                <option value="Casual Leave">Casual Leave</option>
                                <option value="Medical Leave">Medical Leave</option>
                                <option value="Emergency Leave">Emergency Leave</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="sp-field">
                            <label>Parent Contact Number</label>
                            <input
                                type="text"
                                name="parentContact"
                                value={formData.parentContact}
                                onChange={handleChange}
                                placeholder="10-digit number"
                                required
                                style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
                            />
                        </div>

                        <div className="sp-field full-width">
                            <label>Reason for Leave</label>
                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                placeholder="Please provide a valid reason..."
                                required
                                rows="2"
                                style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-elevated)', color: 'var(--text-primary)', width: '100%', resize: 'vertical' }}
                            />
                        </div>

                        <div className="sp-field full-width">
                            <label>Destination Address</label>
                            <textarea
                                name="destinationAddress"
                                value={formData.destinationAddress}
                                onChange={handleChange}
                                placeholder="Full address during leave..."
                                required
                                rows="2"
                                style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-elevated)', color: 'var(--text-primary)', width: '100%', resize: 'vertical' }}
                            />
                        </div>

                        <div className="sp-field full-width">
                            <label>Upload PDF (Optional)</label>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <FiUpload style={{ color: 'var(--text-muted)' }} />
                                <input
                                    id="fileInput"
                                    type="file"
                                    name="document"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            marginTop: '20px',
                            width: '100%',
                            padding: '12px',
                            background: 'var(--primary)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Submitting...' : <><FiFileText /> Submit Leave Request</>}
                    </button>
                </form>
            </div>

            <div className="sp-section">
                <div className="sp-section-header">
                    <span>My Leave History</span>
                    <FiClock />
                </div>

                <div className="leave-list">
                    {leaves.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                            <p>No leave requests found.</p>
                        </div>
                    ) : (
                        leaves.map(leave => (
                            <div
                                key={leave._id}
                                className="leave-item"
                                style={{
                                    borderLeft: `4px solid ${leave.status === 'Approved' ? '#10b981' : leave.status === 'Rejected' ? '#ef4444' : '#eab308'}`,
                                    marginBottom: '10px'
                                }}
                            >
                                <div className="leave-item-top" style={{ justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', margin: 0 }}>
                                        <FiFileText /> {leave.leaveType}
                                    </h4>
                                    {getStatusBadge(leave.status)}
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                    <div>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>From:</span> <br />
                                        {new Date(leave.fromDate).toLocaleDateString()}
                                    </div>
                                    <div>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>To:</span> <br />
                                        {new Date(leave.toDate).toLocaleDateString()}
                                    </div>
                                </div>

                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '5px 0' }}>
                                    <strong style={{ color: 'var(--text-primary)' }}>Reason:</strong> {leave.reason}
                                </p>

                                {leave.status === 'Approved' && leave.approvedDate && (
                                    <div style={{ marginTop: '8px', fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <FiCheckCircle size={14} /> Approved on: {new Date(leave.approvedDate).toLocaleDateString()}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
