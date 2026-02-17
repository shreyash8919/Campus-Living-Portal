import React from 'react';
import { FiShield, FiHome, FiMonitor, FiHeadphones } from 'react-icons/fi';
import './ResidentDigitalCharter.css';

const ResidentDigitalCharter = () => {
    const cards = [
        {
            id: 1,
            title: "Identity Verification Protocol",
            text: "Access is restricted to officially registered residents and authorized authorities only.",
            icon: <FiShield className="charter-icon" />,
        },
        {
            id: 2,
            title: "Discipline & Institutional Integrity",
            text: "Residents must uphold discipline, decorum, and institutional respect at all times.",
            icon: <FiHome className="charter-icon" />,
        },
        {
            id: 3,
            title: "Digital Usage Responsibility",
            text: "The portal shall be used strictly for official and authorized purposes.",
            icon: <FiMonitor className="charter-icon" />,
        },
        {
            id: 4,
            title: "Contact Support",
            text: "For assistance or queries, residents may contact the hostel administration.",
            icon: <FiHeadphones className="charter-icon" />,
        }
    ];

    return (
        <div className="digital-charter-section">
            <div className="charter-header">
                <h3>Resident Digital Charter</h3>
                <p>Ensuring Discipline, Security and Responsible Digital Governance</p>
            </div>
            
            <div className="charter-grid">
                {cards.map((card) => (
                    <div key={card.id} className="charter-card">
                        <div className="card-icon-wrapper">
                            {card.icon}
                        </div>
                        <h4>{card.title}</h4>
                        <p>{card.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResidentDigitalCharter;
