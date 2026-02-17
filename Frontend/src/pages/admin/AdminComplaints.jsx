import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { allComplaints } from '../../data/mockData';
import { FiSave } from 'react-icons/fi';
import './AdminPages.css';

export default function AdminComplaints() {
    const { user } = useAuth();
    const [complaints, setComplaints] = useState(
        allComplaints.filter(c => c.hostelName === user?.hostelName)
    );
    const [filter, setFilter] = useState('All');

    const filtered = filter === 'All' ? complaints : complaints.filter(c => c.status === filter);

    const updateStatus = (id, newStatus) => {
        setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } : c));
    };

    const updateRemark = (id, remark) => {
        setComplaints(prev => prev.map(c => c.id === id ? { ...c, wardenRemark: remark } : c));
    };

    const updateAssigned = (id, assignedTo) => {
        setComplaints(prev => prev.map(c => c.id === id ? { ...c, assignedTo } : c));
    };

    return (
        <div className="admin-page animate-fade-in">
            <h1 className="admin-page-title">📢 Complaint Management</h1>
            <p className="admin-page-subtitle">View, monitor, and resolve complaints from {user?.hostelName} Hostel</p>

            <div className="admin-filters">
                {['All', 'Pending', 'In Progress', 'Resolved'].map(f => (
                    <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                        {f} {f !== 'All' && `(${complaints.filter(c => c.status === f).length})`}
                    </button>
                ))}
            </div>

            <div className="admin-complaint-list">
                {filtered.map(c => (
                    <div key={c.id} className="admin-complaint-card">
                        <div className="admin-complaint-header">
                            <div className="admin-complaint-meta">
                                <span className="complaint-id">{c.id}</span>
                                <span className={`badge badge-${c.priority.toLowerCase() === 'high' ? 'urgent' : c.priority.toLowerCase() === 'medium' ? 'important' : 'new'}`}>{c.priority}</span>
                                <span className={`status-tag status-${c.status === 'Pending' ? 'pending' : c.status === 'In Progress' ? 'progress' : 'resolved'}`}>{c.status}</span>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📅 {c.createdAt}</span>
                        </div>

                        <h4>{c.studentName} (ID: {c.studentId}) — {c.type}</h4>
                        <p className="description">{c.description}</p>

                        <div className="admin-complaint-info">
                            <span>🏠 Hostel: {c.hostelName}</span>
                            {c.assignedTo && <span>🔧 Assigned: {c.assignedTo}</span>}
                            {c.updatedAt && <span>🔄 Updated: {c.updatedAt}</span>}
                        </div>

                        {c.wardenRemark && (
                            <div className="admin-remark-display">
                                <small>Warden Remark:</small>
                                <p>{c.wardenRemark}</p>
                            </div>
                        )}

                        <div className="admin-complaint-actions">
                            <select value={c.status} onChange={e => updateStatus(c.id, e.target.value)}>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                            </select>
                            <select value={c.assignedTo || ''} onChange={e => updateAssigned(c.id, e.target.value)}>
                                <option value="">Assign to...</option>
                                <option value="Electrician">Electrician</option>
                                <option value="Plumber">Plumber</option>
                                <option value="Cleaning Staff">Cleaning Staff</option>
                                <option value="Security">Security</option>
                            </select>
                            <input
                                placeholder="Add remark..."
                                value={c.wardenRemark}
                                onChange={e => updateRemark(c.id, e.target.value)}
                            />
                            <button className="btn btn-sm btn-primary"><FiSave /> Save</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
