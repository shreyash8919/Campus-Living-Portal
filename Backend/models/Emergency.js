const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    studentName: { type: String, required: true },
    hostelName: { type: String },
    roomNumber: { type: String },
    phoneNumber: { type: String },
    location: {
        lat: Number,
        lng: Number
    },
    status: {
        type: String,
        enum: ['Sent to Security', 'Escalated to Warden', 'Critical Escalation', 'Resolved'],
        default: 'Sent to Security'
    },
    escalationLevel: {
        type: String,
        enum: ['Security', 'Warden', 'Admin'],
        default: 'Security'
    },
    logs: [{
        message: String,
        timestamp: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now },
    responseTimerStart: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Emergency', emergencySchema);
