import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiShield, FiArrowRight, FiSmartphone, FiCheck } from 'react-icons/fi';
import './Login.css';

export default function LoginPage() {
    const [loginType, setLoginType] = useState(null); // 'student' | 'admin'
    const [enrollmentNo, setEnrollmentNo] = useState('');
    const [password, setPassword] = useState('');

    // Admin
    const [email, setEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [adminId, setAdminId] = useState('');
    const [hostelName, setHostelName] = useState('');

    const { loginAsStudent, loginAsAdmin } = useAuth();
    const navigate = useNavigate();

    const handleStudentLogin = async (e) => {
        e.preventDefault();
        const trimmedEnrollment = enrollmentNo.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEnrollment || !trimmedPassword) {
            alert("All fields are required");
            return;
        }

        const result = await loginAsStudent(trimmedEnrollment, trimmedPassword);
        if (result.success) {
            navigate('/student/dashboard');
        } else {
            alert(result.message || 'Login Failed');
        }
    };

    const handleAdminLogin = async (e) => {
        e.preventDefault();

        const trimmedEmail = email.trim();
        const trimmedPassword = adminPassword.trim();
        const trimmedAdminId = adminId.trim();

        if (!trimmedEmail || !trimmedPassword || !trimmedAdminId || !hostelName) {
            alert("All fields including Hostel are required");
            return;
        }

        const result = await loginAsAdmin(trimmedEmail, trimmedPassword, trimmedAdminId, hostelName);
        if (result.success) {
            navigate('/admin/dashboard');
        } else {
            alert(result.message || 'Login Failed');
        }
    };

    return (
        <div className="page-wrapper login-page">
            <div className="login-bg-effects">
                <div className="login-orb orb-a"></div>
                <div className="login-orb orb-b"></div>
            </div>

            <div className="container login-container">
                {!loginType ? (
                    <div className="login-select animate-fade-in" id="login-select">
                        <div className="login-select-header">
                            <h1>Welcome Back</h1>
                            <p>Choose your login type to continue</p>
                        </div>
                        <div className="login-select-cards">
                            <div className="login-select-card" onClick={() => setLoginType('student')} id="login-as-student">
                                <div className="login-card-icon student-icon"><FiUser /></div>
                                <h3>Student Login</h3>
                                <p>Access your hostel dashboard, profile, and services</p>
                                <span className="login-card-arrow"><FiArrowRight /></span>
                            </div>
                            <div className="login-select-card" onClick={() => setLoginType('admin')} id="login-as-admin">
                                <div className="login-card-icon admin-icon"><FiShield /></div>
                                <h3>Admin / Warden Login</h3>
                                <p>Manage hostel operations, complaints, and student records</p>
                                <span className="login-card-arrow"><FiArrowRight /></span>
                            </div>
                        </div>
                    </div>
                ) : loginType === 'student' ? (
                    <div className="login-form-wrap animate-fade-in" id="student-login-form">
                        <button className="login-back" onClick={() => { setLoginType(null); setEnrollmentNo(''); setPassword(''); }}>
                            ← Back
                        </button>

                        <div className="login-form-header">
                            <div className="login-form-icon student-icon"><FiUser /></div>
                            <h2>Student Login</h2>
                            <p>Enter your enrollment details to continue</p>
                        </div>

                        <hr className="login-divider" />

                        <form onSubmit={handleStudentLogin}>
                            <div className="login-form-fields">
                                <div className="form-group">
                                    <label>Enrollment Number</label>
                                    <input
                                        type="text"
                                        name="enrollmentNo"
                                        placeholder="Enter your enrollment no"
                                        value={enrollmentNo}
                                        onChange={(e) => setEnrollmentNo(e.target.value)}
                                        required
                                        id="enrollment-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        id="student-password-input"
                                    />
                                </div>
                                <div className="form-info-box">
                                    <FiCheck style={{ fontSize: '1.2rem', minWidth: '20px' }} />
                                    <span>Your enrollment must be present in the merit/selection list</span>
                                </div>
                                <button type="submit" className="btn btn-primary login-submit" id="student-login-submit">
                                    LOGIN <FiArrowRight />
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="login-form-wrap animate-fade-in" id="admin-login-form">
                        <button className="login-back" onClick={() => setLoginType(null)}>
                            ← Back
                        </button>

                        <div className="login-form-header">
                            <div className="login-form-icon admin-icon"><FiShield /></div>
                            <h2>Admin / Warden Login</h2>
                            <p>Enter your credentials to access the dashboard</p>
                        </div>

                        <hr className="login-divider" />

                        <form onSubmit={handleAdminLogin}>
                            <div className="login-form-fields">
                                <div className="form-group">
                                    <label>Email ID</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter registered email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        id="admin-email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="adminPassword"
                                        placeholder="Enter password"
                                        value={adminPassword}
                                        onChange={(e) => setAdminPassword(e.target.value)}
                                        required
                                        id="admin-password"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Admin ID</label>
                                    <input
                                        type="text"
                                        name="adminId"
                                        placeholder="Enter Admin ID"
                                        value={adminId}
                                        onChange={(e) => setAdminId(e.target.value)}
                                        required
                                        id="admin-id"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Hostel Name</label>
                                    <select
                                        name="hostelName"
                                        value={hostelName}
                                        onChange={(e) => setHostelName(e.target.value)}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '8px',
                                            border: '1px solid #ddd',
                                            fontSize: '1rem',
                                            backgroundColor: '#fff'
                                        }}
                                    >
                                        <option value="">Select your hostel</option>
                                        <option value="Saraswati">Saraswati</option>
                                        <option value="Shwetambar">Shwetambar</option>
                                        <option value="Shivneri">Shivneri</option>
                                        <option value="Lenyadri">Lenyadri</option>
                                        <option value="Bhimashankar">Bhimashankar</option>
                                    </select>
                                </div>
                                <div className="form-info-box">
                                    <FiShield style={{ fontSize: '1.2rem', minWidth: '20px' }} /> <span>Use official credentials</span>
                                </div>
                                <button type="submit" className="btn btn-primary login-submit" id="admin-login-submit">
                                    LOGIN AS WARDEN <FiArrowRight />
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
