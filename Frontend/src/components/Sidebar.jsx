import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiClipboard, FiAlertTriangle, FiCoffee, FiHome, FiCalendar, FiAlertCircle, FiLogOut, FiGrid, FiFileText, FiUsers, FiCheckSquare } from 'react-icons/fi';
import './Sidebar.css';

const studentLinks = [
    { to: '/student/dashboard', icon: <FiGrid />, label: 'Dashboard' },
    { to: '/student/profile', icon: <FiUser />, label: 'Profile' },
    { to: '/student/notices', icon: <FiClipboard />, label: 'Notice Board' },
    { to: '/student/complaints', icon: <FiAlertTriangle />, label: 'Complaint Box' },
    { to: '/student/mess', icon: <FiCoffee />, label: 'Mess Section' },
    { to: '/student/room', icon: <FiHome />, label: 'Room Info' },
    { to: '/student/leave', icon: <FiCalendar />, label: 'Leave Application' },
    { to: '/student/emergency', icon: <FiAlertCircle />, label: 'Emergency' },
    { to: '/student/exit', icon: <FiLogOut />, label: 'Hostel Exit' },
];

const adminLinks = [
    { to: '/admin/dashboard', icon: <FiGrid />, label: 'Dashboard' },
    { to: '/admin/complaints', icon: <FiAlertTriangle />, label: 'Complaints' },
    { to: '/admin/mess', icon: <FiCoffee />, label: 'Mess Management' },
    { to: '/admin/leaves', icon: <FiCalendar />, label: 'Leave Requests' },
    { to: '/admin/notices', icon: <FiFileText />, label: 'Manage Notices' },
    { to: '/admin/students', icon: <FiUsers />, label: 'Students' },
    { to: '/admin/emergency', icon: <FiAlertCircle />, label: 'Emergencies' },
    { to: '/admin/exit', icon: <FiCheckSquare />, label: 'Hostel Exit' },
];

export default function Sidebar({ type = 'student' }) {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const links = type === 'student' ? studentLinks : adminLinks;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <aside className="sidebar" id="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-user-avatar">
                    {(user?.fullName || user?.username || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="sidebar-user-info">
                    <span className="sidebar-user-name">{user?.fullName || user?.username || 'User'}</span>
                    <span className="sidebar-user-role">
                        {type === 'student' ? user?.hostelName + ' Hostel' : 'Warden'}
                    </span>
                </div>
            </div>

            <nav className="sidebar-nav">
                <span className="sidebar-section-label">
                    {type === 'student' ? 'STUDENT DASHBOARD' : 'ADMIN PANEL'}
                </span>
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                    >
                        <span className="sidebar-link-icon">{link.icon}</span>
                        <span className="sidebar-link-label">{link.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="sidebar-logout" onClick={handleLogout} id="sidebar-logout-btn">
                    <FiLogOut />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
