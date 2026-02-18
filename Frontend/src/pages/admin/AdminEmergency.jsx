import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiAlertTriangle, FiCheckCircle, FiClock, FiActivity, FiRefreshCw } from 'react-icons/fi';
import './AdminPages.css';

export default function AdminEmergency() {
    const { user } = useAuth();
    const [stats, setStats] = useState({ active: 0, escalated: 0, resolved: 0 });
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch Dashboard Data
    const fetchDashboard = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/emergency/dashboard');
            const data = await response.json();
            if (data.success) {
                setStats(data.stats);
                setAlerts(data.alerts);
            }
        } catch (error) {
            console.error('Error fetching dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    // Initial Fetch & Polling
    useEffect(() => {
        fetchDashboard();
        const interval = setInterval(fetchDashboard, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, []);

    // Acknowledge Alert Handler
    const handleAcknowledge = async (id) => {
        if (!window.confirm('Acknowledge and Resolve this alert?')) return;

        try {
            const response = await fetch(`http://localhost:5000/api/emergency/acknowledge/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user?.adminId || 'Admin',
                    role: user?.role || 'Warden'
                })
            });
            const data = await response.json();
            if (data.success) {
                alert('Alert Resolved');
                fetchDashboard();
            } else {
                alert('Failed to acknowledge: ' + data.message);
            }
        } catch (error) {
            console.error('Error acknowledging alert:', error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Sent to Security': return '#ffc107'; // Yellow
            case 'Escalated to Warden': return '#fd7e14'; // Orange
            case 'Critical Escalation': return '#dc3545'; // Red
            case 'Resolved': return '#28a745'; // Green
            default: return '#6c757d';
        }
    };

    return (
        <div className="admin-page animate-fade-in" style={{ padding: '20px' }}>
            <div className="admin-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h1 className="admin-page-title">🚨 Emergency Response Center</h1>
                    <p className="admin-page-subtitle">Real-time alert monitoring and escalation system</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#28a745', fontWeight: 'bold' }}>
                        <span className="pulsing-dot" style={{ width: '10px', height: '10px', background: '#28a745', borderRadius: '50%', display: 'inline-block' }}></span>
                        Live Monitoring
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="admin-dashboard-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
                <div className="stat-card" style={{ background: '#fff', padding: '20px', borderRadius: '12px', borderLeft: '5px solid #dc3545', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Active Alerts</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc3545', margin: '5px 0 0 0' }}>{stats.active}</p>
                </div>
                <div className="stat-card" style={{ background: '#fff', padding: '20px', borderRadius: '12px', borderLeft: '5px solid #fd7e14', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Escalated</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fd7e14', margin: '5px 0 0 0' }}>{stats.escalated}</p>
                </div>
                <div className="stat-card" style={{ background: '#fff', padding: '20px', borderRadius: '12px', borderLeft: '5px solid #28a745', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Resolved</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745', margin: '5px 0 0 0' }}>{stats.resolved}</p>
                </div>
            </div>

            {/* Alerts List */}
            <div className="active-alerts-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: '600' }}>Recent Alerts</h2>
                    <button onClick={fetchDashboard} className="btn-icon" title="Refresh">
                        <FiRefreshCw className={loading ? 'spin' : ''} />
                    </button>
                </div>

                <div className="alerts-list">
                    {alerts.length === 0 ? (
                        <p style={{ textAlign: 'center', padding: '40px', color: '#999' }}>No alerts found.</p>
                    ) : (
                        alerts.map(alert => (
                            <div key={alert._id} className="alert-item" style={{
                                background: 'white',
                                borderRadius: '8px',
                                padding: '20px',
                                marginBottom: '15px',
                                border: '1px solid #eee',
                                borderLeft: `5px solid ${getStatusColor(alert.status)}`,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                            }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                                        <span className={`badge`} style={{
                                            background: getStatusColor(alert.status),
                                            color: 'white',
                                            padding: '4px 10px',
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            fontWeight: '600'
                                        }}>
                                            {alert.status.toUpperCase()}
                                        </span>
                                        <span style={{ fontSize: '0.85rem', color: '#666' }}>
                                            <FiClock style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                                            {new Date(alert.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                    <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{alert.studentName} ({alert.studentId})</h3>
                                    <p style={{ margin: 0, color: '#555' }}>
                                        <strong>Location:</strong> {alert.hostelName || 'Unknown Hostel'}, Room {alert.roomNumber || 'Unknown'} | <strong>Phone:</strong> {alert.phoneNumber || 'N/A'}
                                    </p>
                                </div>

                                {alert.status !== 'Resolved' && (
                                    <button
                                        className="btn"
                                        onClick={() => handleAcknowledge(alert._id)}
                                        style={{ background: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
                                    >
                                        <FiCheckCircle /> Acknowledge
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
            <style>{`
                @keyframes spin { 
                    100% { transform: rotate(360deg); } 
                }
                .spin { animation: spin 1s linear infinite; }
                @keyframes pulse-dot {
                    0% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7); }
                    70% { box-shadow: 0 0 0 6px rgba(40, 167, 69, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0); }
                }
                .pulsing-dot { animation: pulse-dot 2s infinite; }
            `}</style>
        </div>
    );
}
