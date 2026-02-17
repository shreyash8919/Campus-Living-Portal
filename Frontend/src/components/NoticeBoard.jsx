import React from 'react';
import { FiLink } from 'react-icons/fi';
import './NoticeBoard.css';

const NoticeBoard = ({ notices = [] }) => {
    // Duplicate notices for infinite scroll effect
    const scrollNotices = [...notices, ...notices];

    return (
        <div className="notice-board-container">
            <div className="notice-board-header">
                <h3>Notice Board</h3>
            </div>
            <div className="notice-board-content">
                <div className="notice-scroll-wrapper">
                    <ul className="notice-list">
                        {scrollNotices.map((notice, index) => (
                            <li key={`${notice.id}-${index}`} className="notice-item">
                                <a href="#" className="notice-link" onClick={(e) => e.preventDefault()}>
                                    <FiLink className="notice-icon" />
                                    <div className="notice-info">
                                        <div className="notice-title">{notice.title}</div>
                                        {notice.date && (
                                            <span className="notice-date">
                                                {new Date(notice.date).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        )}
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NoticeBoard;
