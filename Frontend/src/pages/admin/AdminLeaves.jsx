import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { allLeaveRequests } from '../../data/mockData';
import { FiCheck, FiX } from 'react-icons/fi';
import './AdminPages.css';

export default function AdminLeaves() {
    const { user } = useAuth();
    const [leaves, setLeaves] = useState(
        allLeaveRequests.filter(l => l.hostelName === user?.hostelName)
    );

    const updateStatus = (id, status) => {
        setLeaves(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    };

    return (
        <div className="admin-page animate-fade-in">
            <h1 className="admin-page-title">📅 Leave Requests</h1>
            <p className="admin-page-subtitle">Manage student leave applications for {user?.hostelName} Hostel</p>

            {leaves.length === 0 ? (
                <div className="sp-section" style={{ textAlign: 'center', padding: 40 }}>
                    <p style={{ color: 'var(--text-muted)' }}>No leave requests at this time.</p>
                </div>
            ) : (
                leaves.map(l => (
                    <div key={l.id} className="admin-leave-card">
                        <div className="admin-leave-header">
                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                <span className="complaint-id">{l.id}</span>
                                <span className="badge badge-important">{l.leaveType}</span>
                                <span className={`status-tag status-${l.status === 'Approved' ? 'approved' : l.status === 'Rejected' ? 'rejected' : 'pending'}`}>{l.status}</span>
                            </div>
                        </div>
                        <h4>{l.studentName} — Room {l.roomNo}</h4>
                        <p>{l.reason}</p>
                        <div style={{ display: 'flex', gap: 20, fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 8 }}>
                            <span>📅 {l.fromDate} → {l.toDate}</span>
                            <span>📞 Parent: {l.parentContact}</span>
                        </div>
                        {l.status === 'Pending' && (
                            <div className="admin-leave-actions">
                                <button className="btn btn-sm btn-primary" onClick={() => updateStatus(l.id, 'Approved')}>
                                    <FiCheck /> Approve
                                </button>
                                <button className="btn btn-sm btn-danger" onClick={() => updateStatus(l.id, 'Rejected')}>
                                    <FiX /> Reject
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
