import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import Sidebar from './components/Sidebar';
import { Suspense, lazy } from 'react';

// Reset CSS explicitly
import './App.css';
import './pages/student/StudentPages.css';
import './pages/admin/AdminPages.css';

// Lazy load pages to isolate crashes
const HomePage = lazy(() => import('./pages/landing/HomePage'));
const AboutPage = lazy(() => import('./pages/landing/AboutPage'));
const NoticesPage = lazy(() => import('./pages/landing/NoticesPage'));
const ContactPage = lazy(() => import('./pages/landing/ContactPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));

const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard'));
const ProfilePage = lazy(() => import('./pages/student/ProfilePage'));
const NoticeBoardPage = lazy(() => import('./pages/student/NoticeBoardPage'));
const ComplaintBoxPage = lazy(() => import('./pages/student/ComplaintBoxPage'));
const MessPage = lazy(() => import('./pages/student/MessPage'));
const RoomInfoPage = lazy(() => import('./pages/student/RoomInfoPage'));
const LeavePage = lazy(() => import('./pages/student/LeavePage'));
const EmergencyPage = lazy(() => import('./pages/student/EmergencyPage'));
const HostelExitPage = lazy(() => import('./pages/student/HostelExitPage'));

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminComplaints = lazy(() => import('./pages/admin/AdminComplaints'));
const AdminMess = lazy(() => import('./pages/admin/AdminMess'));
const AdminLeaves = lazy(() => import('./pages/admin/AdminLeaves'));
const AdminNotices = lazy(() => import('./pages/admin/AdminNotices'));
const AdminStudents = lazy(() => import('./pages/admin/AdminStudents'));
const AdminEmergency = lazy(() => import('./pages/admin/AdminEmergency'));
const AdminExit = lazy(() => import('./pages/admin/AdminExit'));

// Loading component
const PageLoader = () => (
  <div style={{ padding: '50px', display: 'flex', justifyContent: 'center', color: '#9ca3af' }}>
    Loading Component...
  </div>
);

function ProtectedRoute({ type }) {
  const { isAuthenticated, userType } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (type && userType !== type) return <Navigate to="/" replace />;
  return <Outlet />;
}

function DashboardLayout({ type }) {
  return (
    <div className="dashboard-layout">
      {type === 'admin' ? <AdminNavbar /> : <Navbar isDashboard={true} />}
      <div className="dashboard-body">
        <Sidebar type={type} />
        <div className="dashboard-content">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes - Wrapped with Navbar */}
            <Route element={<><Navbar /><Outlet /></>}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/notices" element={<NoticesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Student Routes */}
            <Route element={<ProtectedRoute type="student" />}>
              <Route element={<DashboardLayout type="student" />}>
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/profile" element={<ProfilePage />} />
                <Route path="/student/notices" element={<NoticeBoardPage />} />
                <Route path="/student/complaints" element={<ComplaintBoxPage />} />
                <Route path="/student/mess" element={<MessPage />} />
                <Route path="/student/room" element={<RoomInfoPage />} />
                <Route path="/student/leave" element={<LeavePage />} />
                <Route path="/student/emergency" element={<EmergencyPage />} />
                <Route path="/student/exit" element={<HostelExitPage />} />
              </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute type="admin" />}>
              <Route element={<DashboardLayout type="admin" />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/complaints" element={<AdminComplaints />} />
                <Route path="/admin/mess" element={<AdminMess />} />
                <Route path="/admin/leaves" element={<AdminLeaves />} />
                <Route path="/admin/notices" element={<AdminNotices />} />
                <Route path="/admin/students" element={<AdminStudents />} />
                <Route path="/admin/emergency" element={<AdminEmergency />} />
                <Route path="/admin/exit" element={<AdminExit />} />
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
