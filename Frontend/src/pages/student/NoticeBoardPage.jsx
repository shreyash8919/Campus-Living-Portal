import { useState } from 'react';
import { dashboardNotices } from '../../data/mockData';
import { FiDownload, FiCheck, FiPin } from 'react-icons/fi';
import './StudentPages.css';

export default function NoticeBoardPage() {
    const [notices, setNotices] = useState(dashboardNotices);
    const unreadCount = notices.filter(n => n.readStatus === 'Unseen').length;

    const markAsRead = (id) => {
        setNotices(prev => prev.map(n => n.id === id ? { ...n, readStatus: 'Seen' } : n));
    };

    const sorted = [...notices].sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0;
    });

    return (
        <div className="sp-page animate-fade-in">
            <h1 className="sp-title">📋 Notice Board</h1>
            <p className="sp-subtitle">
                {unreadCount > 0 ? `🔔 ${unreadCount} New Notices` : 'All notices read'}
            </p>

            <div className="notice-board-list">
                {sorted.map(notice => (
                    <div
                        key={notice.id}
                        className={`nb-notice-item ${notice.readStatus === 'Unseen' ? 'unseen' : ''} ${notice.pinned ? 'pinned' : ''}`}
                        onClick={() => markAsRead(notice.id)}
                    >
                        <div className="nb-notice-top">
                            {notice.pinned && <span className="pin-badge">📌 Pinned</span>}
                            <span className={`badge badge-${notice.priority.toLowerCase()}`}>{notice.priority}</span>
                            <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>{notice.category}</span>
                            {notice.readStatus === 'Unseen' && <span className="unseen-dot"></span>}
                        </div>
                        <h4>{notice.title}</h4>
                        <p>{notice.description}</p>
                        <div className="nb-notice-footer">
                            <span>📅 {notice.dateTime} • Issued by: {notice.issuedBy}</span>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {notice.attachment && (
                                    <button className="btn btn-sm btn-outline" onClick={e => e.stopPropagation()}>
                                        <FiDownload /> {notice.attachment}
                                    </button>
                                )}
                                {notice.readStatus === 'Unseen' ? (
                                    <button className="btn btn-sm btn-accent" onClick={(e) => { e.stopPropagation(); markAsRead(notice.id); }}>
                                        <FiCheck /> Confirm Read
                                    </button>
                                ) : (
                                    <span className="status-tag status-resolved">✓ Seen</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
