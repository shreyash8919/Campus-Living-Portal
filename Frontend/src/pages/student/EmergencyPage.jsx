import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiAlertTriangle, FiPhone, FiMapPin } from 'react-icons/fi';
import './StudentPages.css';

export default function EmergencyPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState(null);

    const handleSOS = async () => {
        if (!window.confirm("ARE YOU SURE you want to trigger an Emergency Alert?\nThis will notify Security and Warden immediately.")) return;

        setLoading(true);

        // Get Location
        let currentLat = null;
        let currentLng = null;

        if (navigator.geolocation) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
                });
                currentLat = position.coords.latitude;
                currentLng = position.coords.longitude;
            } catch (error) {
                console.error("Location access denied or failed", error);
                // Proceed without location
            }
        }

        // Construct Payload
        const payload = {
            studentName: user?.fullName || user?.name || "Unknown Student",
            studentId: user?.enrollmentNo || user?.enrollmentNumber || "Unknown ID",
            hostelName: user?.hostelName || "Unknown Hostel",
            roomNumber: user?.roomNumber || "Unknown Room",
            phoneNumber: user?.mobile || user?.phoneNumber || "No Phone",
            lat: currentLat,
            lng: currentLng
        };

        try {
            const response = await fetch('http://localhost:5000/api/emergency/trigger', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.success) {
                alert(`🚨 SOS ALERT SENT!\n\nSecurity has been notified.\nHelp is on the way.\n\nAlert ID: ${data.alertId}`);
            } else {
                alert('Failed to send alert: ' + data.message);
            }
        } catch (error) {
            console.error('SOS Error:', error);
            alert('Error connecting to emergency server. Please call Security directly: 9970723236');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sp-page animate-fade-in" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '70vh',
            textAlign: 'center'
        }}>
            <style>{`
                @keyframes pulse-red {
                    0% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7); }
                    70% { box-shadow: 0 0 0 30px rgba(220, 53, 69, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); }
                }
                .priority-step {
                    position: relative;
                    padding: 15px 25px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                    border: 1px solid rgba(0,0,0,0.05);
                    transition: transform 0.2s;
                    min-width: 150px;
                }
                .priority-step:hover {
                    transform: translateY(-5px);
                }
                .arrow-divider {
                    font-size: 2rem;
                    color: #cbd5e1;
                    margin: 0 15px;
                }
            `}</style>

            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#1e293b' }}>Emergency SOS</h1>
                <p style={{ color: '#64748b' }}>Press the button below for immediate assistance</p>
            </div>

            <button
                className="btn"
                onClick={handleSOS}
                disabled={loading}
                style={{
                    background: 'linear-gradient(135deg, #dc3545 0%, #ff4d4d 100%)',
                    color: 'white',
                    width: '280px',
                    height: '280px',
                    borderRadius: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '8px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 20px 40px rgba(220, 53, 69, 0.4)',
                    animation: 'pulse-red 2s infinite',
                    marginBottom: '60px',
                    cursor: loading ? 'wait' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: loading ? 0.8 : 1
                }}
                onMouseEnter={(e) => { !loading && (e.currentTarget.style.transform = 'scale(1.05)'); }}
                onMouseLeave={(e) => { !loading && (e.currentTarget.style.transform = 'scale(1)'); }}
                onMouseDown={(e) => { !loading && (e.currentTarget.style.transform = 'scale(0.95)'); }}
                onMouseUp={(e) => { !loading && (e.currentTarget.style.transform = 'scale(1.05)'); }}
            >
                <FiAlertTriangle size={90} />
                <span style={{ fontSize: '3.5rem', fontWeight: '800', marginTop: '10px', letterSpacing: '2px' }}>
                    {loading ? 'SENDING' : 'SOS'}
                </span>
            </button>

            <div className="priority-container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '10px',
                marginBottom: '40px'
            }}>
                <div className="priority-step">
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', fontWeight: '600', marginBottom: '5px' }}>First Priority</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a' }}>SECURITY</div>
                </div>

                <div className="arrow-divider">→</div>

                <div className="priority-step">
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', fontWeight: '600', marginBottom: '5px' }}>Second Priority</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a' }}>WARDEN</div>
                </div>
            </div>

            <div style={{ background: '#fff1f2', padding: '15px 30px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #fecdd3' }}>
                <FiPhone className="text-red-500" />
                <span style={{ color: '#e11d48', fontWeight: 'bold' }}>Emergency Hotline: 9970723236</span>
            </div>
        </div>
    );
}
