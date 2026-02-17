import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { allComplaints, allLeaveRequests, exitRequests } from '../../data/mockData';
import { FiAlertTriangle, FiCalendar, FiCoffee, FiFileText, FiUsers, FiAlertCircle, FiCheckSquare, FiArrowRight } from 'react-icons/fi';
import './AdminPages.css';

export default function AdminDashboard() {
    const { user } = useAuth();
    const hostelComplaints = allComplaints.filter(c => c.hostelName === user?.hostelName);
    const pendingComplaints = hostelComplaints.filter(c => c.status === 'Pending').length;
    const pendingLeaves = allLeaveRequests.filter(l => l.hostelName === user?.hostelName && l.status === 'Pending').length;

    const stats = [
        { label: 'Total Complaints', value: hostelComplaints.length, icon: <FiAlertTriangle /> },
        { label: 'Pending Complaints', value: pendingComplaints, icon: <FiAlertTriangle /> },
        { label: 'Pending Leaves', value: pendingLeaves, icon: <FiCalendar /> },
        { label: 'Exit Requests', value: exitRequests.length, icon: <FiCheckSquare /> },
    ];

    const quickLinks = [
        { to: '/admin/complaints', icon: <FiAlertTriangle />, label: 'Complaints' },
        { to: '/admin/mess', icon: <FiCoffee />, label: 'Mess' },
        { to: '/admin/leaves', icon: <FiCalendar />, label: 'Leaves' },
        { to: '/admin/notices', icon: <FiFileText />, label: 'Notices' },
        { to: '/admin/students', icon: <FiUsers />, label: 'Students' },
        { to: '/admin/emergency', icon: <FiAlertCircle />, label: 'Emergency' },
        { to: '/admin/exit', icon: <FiCheckSquare />, label: 'Exit' },
    ];

    return (
        <div className="admin-dashboard animate-fade-in">
            <div className="admin-welcome">
                <div>
                    <h1>Admin Dashboard 🛡️</h1>
                    <p>Welcome, {user?.username} ({user?.email}) • {user?.hostelName} Hostel Warden</p>
                </div>
            </div>

            {/* Stats */}
            <div className="admin-stats">
                {stats.map((s, i) => (
                    <div key={i} className="admin-stat-card">
                        <div className="admin-stat-icon">{s.icon}</div>
                        <div className="admin-stat-info">
                            <span className="admin-stat-value">{s.value}</span>
                            <span className="admin-stat-label">{s.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Links */}
            <h2 className="admin-section-title">Quick Access</h2>
            <div className="admin-quick-grid">
                {quickLinks.map((link) => (
                    <Link key={link.to} to={link.to} className="admin-quick-card">
                        <div className="admin-quick-icon">{link.icon}</div>
                        <span>{link.label}</span>
                        <FiArrowRight className="admin-quick-arrow" />
                    </Link>
                ))}
            </div>

            {/* Recent Complaints */}
            <h2 className="admin-section-title">Recent Complaints</h2>
            <div className="admin-recent-list">
                {hostelComplaints.slice(0, 3).map(c => (
                    <div key={c.id} className="admin-recent-item">
                        <div className="admin-recent-top">
                            <span className="complaint-id">{c.id}</span>
                            <span className={`badge badge-${c.priority.toLowerCase() === 'high' ? 'urgent' : 'important'}`}>{c.priority}</span>
                            <span className={`status-tag status-${c.status === 'Pending' ? 'pending' : c.status === 'In Progress' ? 'progress' : 'resolved'}`}>{c.status}</span>
                        </div>
                        <h4>{c.studentName} — {c.type}</h4>
                        <p>{c.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
