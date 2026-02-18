const express = require('express');
const router = express.Router();
const Emergency = require('../models/Emergency');

// In-memory store for timers (Note: Not persistent across server restarts)
const escalationTimers = {};

// Mock Notification Functions (Replace with actual Twilio/Nodemailer implementation)
const sendSMS = (to, message) => {
    console.log(`[SMS] To: ${to} | Message: ${message}`);
    // implementation with twilio would go here
};

const sendEmail = (to, subject, body) => {
    console.log(`[Email] To: ${to} | Subject: ${subject} | Body: ${body}`);
    // implementation with nodemailer would go here
};

// Alert Trigger
router.post('/trigger', async (req, res) => {
    try {
        const { studentName, studentId, hostelName, roomNumber, phoneNumber, lat, lng } = req.body;

        const newAlert = new Emergency({
            studentName,
            studentId,
            hostelName,
            roomNumber,
            phoneNumber,
            location: { lat, lng },
            status: 'Sent to Security',
            escalationLevel: 'Security',
            logs: [{ message: `Alert Triggered by ${studentName}`, timestamp: new Date() }]
        });

        await newAlert.save();

        // 1. Notify Security
        sendSMS('SECURITY_PHONE', `EMERGENCY: ${studentName} at ${hostelName} ${roomNumber}`);
        sendEmail('security@college.edu', 'Emergency Alert', `Student ${studentName} reported emergency.`);

        // 2. Start Escalation Timer (2 minutes -> Warden)
        const alertId = newAlert._id.toString();
        escalationTimers[alertId] = setTimeout(async () => {
            await escalateToWarden(alertId);
        }, 2 * 60 * 1000); // 2 minutes

        res.status(201).json({ success: true, message: 'Alert sent to Security', alertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// Acknowledge Alert (Stop Escalation)
router.put('/acknowledge/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { role, userId } = req.body; // e.g., 'Security', 'Warden'

        const alert = await Emergency.findById(id);
        if (!alert) return res.status(404).json({ success: false, message: 'Alert not found' });

        // Clear existing timers
        if (escalationTimers[id]) {
            clearTimeout(escalationTimers[id]);
            delete escalationTimers[id];
        }

        alert.status = 'Resolved';
        alert.logs.push({ message: `Acknowledged & Resolved by ${role} (${userId})`, timestamp: new Date() });
        await alert.save();

        res.json({ success: true, message: 'Alert Acknowledged and Resolved', alert });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// Dashboard Data
router.get('/dashboard', async (req, res) => {
    try {
        const active = await Emergency.countDocuments({ status: { $ne: 'Resolved' } });
        const escalated = await Emergency.countDocuments({ status: { $in: ['Escalated to Warden', 'Critical Escalation'] } });
        const resolved = await Emergency.countDocuments({ status: 'Resolved' });

        const recentAlerts = await Emergency.find().sort({ createdAt: -1 }).limit(10);

        res.json({
            success: true,
            stats: { active, escalated, resolved },
            alerts: recentAlerts
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, mock: true, error: 'Server Error or Database Empty' });
    }
});

// Helper: Escalate to Warden
async function escalateToWarden(alertId) {
    console.log(`[System] Escalating alert ${alertId} to Warden`);
    const alert = await Emergency.findById(alertId);
    if (!alert || alert.status === 'Resolved') return;

    alert.status = 'Escalated to Warden';
    alert.escalationLevel = 'Warden';
    alert.logs.push({ message: 'Auto-escalated to Warden (No response from Security)', timestamp: new Date() });
    await alert.save();

    sendSMS('WARDEN_PHONE', `ESCALATION: Unattended Emergency for ${alert.studentName}`);
    sendEmail('warden@college.edu', 'Escalated Emergency', `Security did not respond. Alert for ${alert.studentName}.`);

    // Start next timer (3 minutes -> Admin)
    escalationTimers[alertId] = setTimeout(async () => {
        await escalateToAdmin(alertId);
    }, 3 * 60 * 1000); // 3 minutes
}

// Helper: Escalate to Admin
async function escalateToAdmin(alertId) {
    console.log(`[System] Escalating alert ${alertId} to Admin/Parent`);
    const alert = await Emergency.findById(alertId);
    if (!alert || alert.status === 'Resolved') return;

    alert.status = 'Critical Escalation';
    alert.escalationLevel = 'Admin';
    alert.logs.push({ message: 'Auto-escalated to Admin & Parent (No response from Warden)', timestamp: new Date() });
    await alert.save();

    sendSMS('ADMIN_PHONE', `CRITICAL: Wireless Emergency ${alert.studentName}`);
    sendSMS(alert.phoneNumber, `Your ward ${alert.studentName} raised an emergency. Admin notified.`); // Mock parent phone
}

module.exports = router;
