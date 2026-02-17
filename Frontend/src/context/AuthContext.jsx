import { createContext, useContext, useState } from 'react';
import { mockStudent } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null); // 'student' | 'admin'
    const [selectedHostel, setSelectedHostel] = useState(null);

    const loginAsStudent = async (enrollmentNo, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/student/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ enrollmentNumber: enrollmentNo, password })
            });

            const data = await response.json();

            if (response.ok) {
                setUser({
                    id: data.student.id,
                    name: data.student.name,
                    enrollmentNumber: data.student.enrollmentNumber,
                    department: data.student.department,
                    year: data.student.year,
                    token: data.token, // Store token if needed for API calls
                    role: 'Student'
                });
                setUserType('student');
                // Store token in localStorage for persistence if required
                localStorage.setItem('token', data.token);
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Server connection error' };
        }
    };

    const loginAsAdmin = async (email, password, adminId, hostelName) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, adminId, hostelName })
            });

            const data = await response.json();

            if (response.ok) {
                setUser({
                    username: data.user.firstName,
                    email: data.user.email,
                    adminId: data.user.adminId,
                    role: 'Warden',
                    hostelName: data.user.hostelName
                });
                setUserType('admin');
                setSelectedHostel('Main');
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Server connection error' };
        }
    };

    const logout = () => {
        setUser(null);
        setUserType(null);
        setSelectedHostel(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            userType,
            selectedHostel,
            loginAsStudent,
            loginAsAdmin,
            logout,
            isAuthenticated: !!user,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
};
