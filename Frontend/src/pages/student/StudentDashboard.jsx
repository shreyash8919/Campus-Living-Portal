import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { FiUser, FiClipboard, FiAlertTriangle, FiCoffee, FiHome, FiCalendar, FiAlertCircle, FiLogOut, FiArrowRight } from 'react-icons/fi';
import { studentComplaints, leaveApplications, dashboardNotices } from '../../data/mockData';
import './StudentDashboard.css';

export default function StudentDashboard() {
    const { user } = useAuth();
    const unreadNotices = dashboardNotices.filter(n => n.readStatus === 'Unseen').length;
    const pendingComplaints = studentComplaints.filter(c => c.status === 'Pending').length;
    const pendingLeaves = leaveApplications.filter(l => l.status === 'Pending').length;

    const quickLinks = [
        { to: '/student/profile', icon: <FiUser />, label: 'Profile' },
        { to: '/student/notices', icon: <FiClipboard />, label: 'Notice Board', badge: unreadNotices },
        { to: '/student/complaints', icon: <FiAlertTriangle />, label: 'Complaint Box', badge: pendingComplaints },
        { to: '/student/mess', icon: <FiCoffee />, label: 'Mess Section' },
        { to: '/student/room', icon: <FiHome />, label: 'Room Info' },
        { to: '/student/leave', icon: <FiCalendar />, label: 'Leave', badge: pendingLeaves },
        { to: '/student/emergency', icon: <FiAlertCircle />, label: 'Emergency' },
        { to: '/student/exit', icon: <FiLogOut />, label: 'Hostel Exit' },
    ];

    return (
        <div className="student-dashboard animate-fade-in">
            {/* Welcome */}
            <div className="dash-welcome">
                <div className="dash-welcome-text">
                    <h1>Welcome back, {user?.fullName?.split(' ')[0]} 👋</h1>
                    <p>{user?.hostelName} Hostel • Room {user?.roomNumber} • {user?.department}</p>
                </div>
                <div className="dash-welcome-status">
                    <span className="badge badge-active">{user?.currentStatus}</span>
                </div>
            </div>

            {/* Stats */}
            <div className="dash-stats">
                <div className="dash-stat-card">
                    <div className="dash-stat-icon"><FiClipboard /></div>
                    <div className="dash-stat-info">
                        <span className="dash-stat-value">{unreadNotices}</span>
                        <span className="dash-stat-label">New Notices</span>
                    </div>
                </div>
                <div className="dash-stat-card">
                    <div className="dash-stat-icon"><FiAlertTriangle /></div>
                    <div className="dash-stat-info">
                        <span className="dash-stat-value">{studentComplaints.length}</span>
                        <span className="dash-stat-label">Complaints</span>
                    </div>
                </div>
                <div className="dash-stat-card">
                    <div className="dash-stat-icon"><FiCalendar /></div>
                    <div className="dash-stat-info">
                        <span className="dash-stat-value">{leaveApplications.length}</span>
                        <span className="dash-stat-label">Total Leaves</span>
                    </div>
                </div>
                <div className="dash-stat-card">
                    <div className="dash-stat-icon"><FiCalendar /></div>
                    <div className="dash-stat-info">
                        <span className="dash-stat-value">{pendingLeaves}</span>
                        <span className="dash-stat-label">Pending Leaves</span>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <h2 className="dash-section-title">Quick Access</h2>
            <div className="dash-quick-grid">
                {quickLinks.map((link) => (
                    <Link key={link.to} to={link.to} className="dash-quick-card">
                        <div className="dash-quick-icon">
                            {link.icon}
                            {link.badge > 0 && <span className="dash-quick-badge">{link.badge}</span>}
                        </div>
                        <span className="dash-quick-label">{link.label}</span>
                    </Link>
                ))}
            </div>

            {/* Recent Notices */}
            <h2 className="dash-section-title">Recent Notices</h2>
            <div className="dash-recent-notices">
                {/* Content removed as per request */}
            </div>
        </div>
    );
}
