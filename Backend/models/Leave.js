const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    fromDate: {
        type: Date,
        required: true
    },
    toDate: {
        type: Date,
        required: true
    },
    leaveType: {
        type: String,
        enum: ['Casual Leave', 'Medical Leave', 'Emergency Leave', 'Other'],
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    destinationAddress: {
        type: String,
        required: true
    },
    parentContact: {
        type: String,
        required: true
    },
    documentUrl: {
        type: String, // URL to the uploaded document
        default: ''
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    appliedDate: {
        type: Date,
        default: Date.now
    },
    approvedDate: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Leave', LeaveSchema);
