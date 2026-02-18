import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiCheck, FiX, FiSearch, FiFilter, FiRefreshCw } from 'react-icons/fi';
import './AdminPages.css';

export default function AdminLeaves() {
    const { user } = useAuth();
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/leave/all', {
                headers: { 'auth-token': token }
            });
            const data = await res.json();
            if (res.ok) {
                setLeaves(data);
            }
        } catch (error) {
            console.error('Error fetching leaves:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        if (!window.confirm(`Are you sure you want to ${status} this leave request?`)) return;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/leave/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({ status })
            });

            if (res.ok) {
                // Optimistic update
                setLeaves(leaves.map(l => l._id === id ? { ...l, status } : l));
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const calculateDays = (from, to) => {
        const start = new Date(from);
        const end = new Date(to);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    };

    // Filter logic
    const filteredLeaves = leaves.filter(leave => {
        const matchesFilter = filter === 'All' || leave.status === filter;
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = leave.studentId?.name?.toLowerCase().includes(searchLower) ||
            leave.studentId?.enrollmentNumber?.toLowerCase().includes(searchLower);
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="admin-page animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h1 className="admin-page-title">📅 Leave Requests</h1>
                    <p className="admin-page-subtitle">Manage student leave applications</p>
                </div>
                <button onClick={fetchLeaves} className="btn btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FiRefreshCw /> Refresh
                </button>
            </div>

            <div className="admin-filters" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <FiFilter />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{ padding: '8px', border: '1px solid #ccc' }}
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <FiSearch />
                    <input
                        type="text"
                        placeholder="Search student..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '8px', border: '1px solid #ccc', minWidth: '200px' }}
                    />
                </div>
            </div>

            <div style={{ overflowX: 'auto', background: '#fff', border: '1px solid #ccc' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f9f9f9', borderBottom: '2px solid #ddd' }}>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '0.9rem', width: '25%' }}>Student Name</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '0.9rem' }}>Roll No</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '0.9rem' }}>Room No</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '0.9rem' }}>Dates</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '0.9rem' }}>Days</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '0.9rem', width: '20%' }}>Reason</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '0.9rem' }}>Status</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '0.9rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="8" style={{ padding: '20px', textAlign: 'center' }}>Loading requests...</td></tr>
                        ) : filteredLeaves.length === 0 ? (
                            <tr><td colSpan="8" style={{ padding: '20px', textAlign: 'center' }}>No leave requests found.</td></tr>
                        ) : (
                            filteredLeaves.map(leave => (
                                <tr key={leave._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px' }}>
                                        <div style={{ fontWeight: 'bold', color: '#333' }}>{leave.studentId?.name || 'Unknown'}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#555' }}>{leave.leaveType}</div>
                                    </td>
                                    <td style={{ padding: '12px' }}>{leave.studentId?.enrollmentNumber || 'N/A'}</td>
                                    <td style={{ padding: '12px' }}>{leave.studentId?.roomNumber || 'N/A'}</td>
                                    <td style={{ padding: '12px', fontSize: '0.85rem' }}>
                                        <div style={{ whiteSpace: 'nowrap' }}>{new Date(leave.fromDate).toLocaleDateString()}</div>
                                        <div style={{ color: '#888', textAlign: 'center', lineHeight: '0.5' }}>⬇</div>
                                        <div style={{ whiteSpace: 'nowrap' }}>{new Date(leave.toDate).toLocaleDateString()}</div>
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        <span style={{ fontWeight: 'bold' }}>{calculateDays(leave.fromDate, leave.toDate)}</span>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <div style={{ maxHeight: '60px', overflowY: 'auto', fontSize: '0.9rem' }}>{leave.reason}</div>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '0.8rem',
                                            fontWeight: 'bold',
                                            backgroundColor: leave.status === 'Approved' ? '#d1fae5' : leave.status === 'Rejected' ? '#fee2e2' : '#fef3c7',
                                            color: leave.status === 'Approved' ? '#065f46' : leave.status === 'Rejected' ? '#b91c1c' : '#b45309'
                                        }}>
                                            {leave.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        {leave.status === 'Pending' && (
                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                <button
                                                    title="Approve"
                                                    onClick={() => updateStatus(leave._id, 'Approved')}
                                                    style={{ padding: '6px', cursor: 'pointer', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px' }}
                                                >
                                                    <FiCheck />
                                                </button>
                                                <button
                                                    title="Reject"
                                                    onClick={() => updateStatus(leave._id, 'Rejected')}
                                                    style={{ padding: '6px', cursor: 'pointer', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px' }}
                                                >
                                                    <FiX />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
