import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiEdit2, FiDownload, FiUser, FiBook, FiHome, FiPhone, FiFile } from 'react-icons/fi';
import './StudentPages.css';

export default function ProfilePage() {
    const { user } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [mobile, setMobile] = useState(user?.mobile || '');
    const [email, setEmail] = useState(user?.email || '');

    return (
        <div className="sp-page animate-fade-in">
            <h1 className="sp-title">Student Profile</h1>
            <p className="sp-subtitle">Your verified, centralized digital hostel record</p>

            {/* Profile Header Card */}
            <div className="profile-header-card">
                <div className="profile-avatar">
                    <FiUser />
                </div>
                <div className="profile-header-info">
                    <h2>{user?.fullName}</h2>
                    <p>Enrollment: {user?.enrollmentNo}</p>
                    <p>Hostel Type: {user?.hostelType} | Academic Year: {user?.academicYear}</p>
                    <span className={`badge badge-${user?.currentStatus?.toLowerCase() === 'active' ? 'active' : 'pending'}`}>
                        {user?.currentStatus}
                    </span>
                </div>
            </div>

            {/* Personal Information */}
            <div className="sp-section">
                <div className="sp-section-header">
                    <h3><FiUser /> Personal Information</h3>
                    <button className="btn btn-sm btn-outline" onClick={() => setEditMode(!editMode)}>
                        <FiEdit2 /> {editMode ? 'Cancel' : 'Edit'}
                    </button>
                </div>
                <div className="sp-fields-grid">
                    <div className="sp-field"><label>Full Name</label><span>{user?.fullName}</span></div>
                    <div className="sp-field"><label>Date of Birth</label><span>{user?.dob}</span></div>
                    <div className="sp-field"><label>Gender</label><span>{user?.gender}</span></div>
                    <div className="sp-field"><label>Category</label><span>{user?.category}</span></div>
                    <div className="sp-field">
                        <label>Mobile Number</label>
                        {editMode ? <input value={mobile} onChange={e => setMobile(e.target.value)} /> : <span>{user?.mobile}</span>}
                    </div>
                    <div className="sp-field">
                        <label>Email ID</label>
                        {editMode ? <input value={email} onChange={e => setEmail(e.target.value)} /> : <span>{user?.email}</span>}
                    </div>
                    <div className="sp-field full-width"><label>Permanent Address</label><span>{user?.permanentAddress}</span></div>
                </div>
                {editMode && (
                    <button className="btn btn-accent btn-sm" style={{ marginTop: 16 }} onClick={() => setEditMode(false)}>
                        Save Changes
                    </button>
                )}
            </div>

            {/* Academic */}
            <div className="sp-section">
                <h3 className="sp-section-header"><FiBook /> Academic Information</h3>
                <div className="sp-fields-grid">
                    <div className="sp-field"><label>Institute</label><span>{user?.instituteName}</span></div>
                    <div className="sp-field"><label>Department</label><span>{user?.department}</span></div>
                    <div className="sp-field"><label>Year of Study</label><span>{user?.yearOfStudy}</span></div>
                    <div className="sp-field"><label>Roll Number / PRN</label><span>{user?.prn}</span></div>
                    <div className="sp-field"><label>Admission Type</label><span>{user?.admissionType}</span></div>
                </div>
            </div>

            {/* Hostel */}
            <div className="sp-section">
                <h3 className="sp-section-header"><FiHome /> Hostel Information</h3>
                <div className="sp-fields-grid">
                    <div className="sp-field"><label>Hostel Name</label><span>{user?.hostelName} ({user?.hostelType})</span></div>
                    <div className="sp-field"><label>Room Number</label><span>{user?.roomNumber}</span></div>
                    <div className="sp-field"><label>Floor Number</label><span>{user?.floorNumber}</span></div>
                    <div className="sp-field"><label>Date of Joining</label><span>{user?.dateOfJoining}</span></div>
                    <div className="sp-field">
                        <label>Fee Status</label>
                        <span className={`status-tag status-${user?.hostelFeeStatus?.toLowerCase() === 'paid' ? 'resolved' : 'pending'}`}>
                            {user?.hostelFeeStatus}
                        </span>
                    </div>
                </div>
            </div>

            {/* Emergency Contact */}
            <div className="sp-section">
                <h3 className="sp-section-header"><FiPhone /> Emergency Contact</h3>
                <div className="sp-fields-grid">
                    <div className="sp-field"><label>Parent / Guardian</label><span>{user?.emergencyContact?.parentName}</span></div>
                    <div className="sp-field"><label>Relationship</label><span>{user?.emergencyContact?.relationship}</span></div>
                    <div className="sp-field"><label>Contact Number</label><span>{user?.emergencyContact?.contactNumber}</span></div>
                    <div className="sp-field full-width"><label>Address</label><span>{user?.emergencyContact?.address}</span></div>
                </div>
            </div>

            {/* Documents */}
            <div className="sp-section">
                <h3 className="sp-section-header"><FiFile /> Documents</h3>
                <div className="sp-docs-list">
                    {user?.documents?.map((doc, i) => (
                        <div key={i} className="sp-doc-item">
                            <div className="sp-doc-icon">📄</div>
                            <div className="sp-doc-info">
                                <span className="sp-doc-name">{doc.name}</span>
                                <span className="sp-doc-date">Uploaded: {doc.uploadedDate}</span>
                            </div>
                            <button className="btn btn-sm btn-outline"><FiDownload /></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
