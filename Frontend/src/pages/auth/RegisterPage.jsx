import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiUserPlus, FiAlertCircle } from 'react-icons/fi';
import './Register.css';

export default function RegisterPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        password: '',
        confirmPassword: '',
        adminId: '',
        confirmAdminId: '',
        hostelName: ''
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validation Logic
    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // First Name
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First Name is required';
        }

        // Email
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Password
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        // Confirm Password
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Admin ID
        if (!formData.adminId.trim()) {
            newErrors.adminId = 'Admin ID is required';
        }

        // Confirm Admin ID
        if (formData.adminId !== formData.confirmAdminId) {
            newErrors.confirmAdminId = 'Admin IDs do not match';
        }

        // Hostel Name
        if (!formData.hostelName) {
            newErrors.hostelName = 'Please select a hostel';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        try {
            // Integration with Backend API
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    email: formData.email,
                    password: formData.password,
                    adminId: formData.adminId,
                    hostelName: formData.hostelName
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registration Successful');
                navigate('/');
            } else {
                alert(data.message || 'Registration failed');
                // Optionally set specific field error if backend returns it
                if (data.field) {
                    setErrors(prev => ({ ...prev, [data.field]: data.message }));
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Server error. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <div className="register-card">
                    <div className="register-header">
                        <h2>Create Account</h2>
                        <p>Register as a new Admin/Warden</p>
                    </div>

                    <form className="register-form" onSubmit={handleSubmit}>
                        {/* First Name */}
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                                className={errors.firstName ? 'error' : ''}
                            />
                            {errors.firstName && (
                                <div className="error-message">
                                    <FiAlertCircle /> {errors.firstName}
                                </div>
                            )}
                        </div>

                        {/* Username (Email) */}
                        <div className="form-group">
                            <label htmlFor="email">Username (Email ID)</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email address"
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && (
                                <div className="error-message">
                                    <FiAlertCircle /> {errors.email}
                                </div>
                            )}
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    className={errors.password ? 'error' : ''}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                            {errors.password && (
                                <div className="error-message">
                                    <FiAlertCircle /> {errors.password}
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className={errors.confirmPassword ? 'error' : ''}
                            />
                            {errors.confirmPassword && (
                                <div className="error-message">
                                    <FiAlertCircle /> {errors.confirmPassword}
                                </div>
                            )}
                        </div>

                        {/* Admin ID */}
                        <div className="form-group">
                            <label htmlFor="adminId">Create Admin ID</label>
                            <input
                                type="text"
                                id="adminId"
                                name="adminId"
                                value={formData.adminId}
                                onChange={handleChange}
                                placeholder="Create unique Admin ID"
                                className={errors.adminId ? 'error' : ''}
                            />
                            {errors.adminId && (
                                <div className="error-message">
                                    <FiAlertCircle /> {errors.adminId}
                                </div>
                            )}
                        </div>

                        {/* Confirm Admin ID */}
                        <div className="form-group">
                            <label htmlFor="confirmAdminId">Confirm Admin ID</label>
                            <input
                                type="text"
                                id="confirmAdminId"
                                name="confirmAdminId"
                                value={formData.confirmAdminId}
                                onChange={handleChange}
                                placeholder="Re-enter Admin ID"
                                className={errors.confirmAdminId ? 'error' : ''}
                            />
                            {errors.confirmAdminId && (
                                <div className="error-message">
                                    <FiAlertCircle /> {errors.confirmAdminId}
                                </div>
                            )}
                        </div>

                        {/* Hostel Name Selection */}
                        <div className="form-group">
                            <label htmlFor="hostelName">Select Hostel</label>
                            <select
                                id="hostelName"
                                name="hostelName"
                                value={formData.hostelName}
                                onChange={handleChange}
                                className={errors.hostelName ? 'error' : ''}
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                            >
                                <option value="">Select Hostel Name</option>
                                <option value="Saraswati">Saraswati Hostel</option>
                                <option value="Shwetambar">Shwetambar Hostel</option>
                                <option value="Shivneri">Shivneri Hostel</option>
                                <option value="Lenyadri">Lenyadri Hostel</option>
                                <option value="Bhimashankar">Bhimashankar Hostel</option>
                            </select>
                            {errors.hostelName && (
                                <div className="error-message">
                                    <FiAlertCircle /> {errors.hostelName}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="register-submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Registering...' : (
                                <>
                                    <FiUserPlus /> Register
                                </>
                            )}
                        </button>

                        <div className="register-footer">
                            Already have an account?
                            <Link to="/login">Login here</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
