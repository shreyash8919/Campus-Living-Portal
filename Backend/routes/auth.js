const express = require('express');
const router = express.Router();
const AdminUser = require('../models/AdminUser');
const bcrypt = require('bcryptjs');

// Register a new Admin/Warden
router.post('/register', async (req, res) => {
    try {
        const { firstName, email, password, adminId, hostelName } = req.body;

        // Validation
        if (!firstName || !email || !password || !adminId || !hostelName) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if admin already exists
        const existingAdmin = await AdminUser.findOne({ $or: [{ email }, { adminId }] });
        if (existingAdmin) {
            return res.status(409).json({ message: 'User with this Email or Admin ID already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newAdmin = new AdminUser({
            firstName,
            email,
            password: hashedPassword,
            adminId,
            hostelName
        });

        const savedAdmin = await newAdmin.save();

        res.status(201).json({
            message: 'Registration Successful',
            user: {
                id: savedAdmin._id,
                firstName: savedAdmin.firstName,
                email: savedAdmin.email,
                adminId: savedAdmin.adminId
            }
        });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server Error during registration' });
    }
});

// Login Admin/Warden
router.post('/login', async (req, res) => {
    try {
        const { email, password, adminId, hostelName } = req.body;

        // Validation
        if (!email || !password || !adminId || !hostelName) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user exists
        const admin = await AdminUser.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify Admin ID matches
        if (admin.adminId !== adminId) {
            return res.status(401).json({ message: 'Invalid Admin ID' });
        }

        // Verify Hostel Name matches
        if (admin.hostelName !== hostelName) {
            return res.status(401).json({ message: 'Invalid Hostel selection for this Admin' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            message: 'Login Successful',
            user: {
                id: admin._id,
                firstName: admin.firstName,
                email: admin.email,
                adminId: admin.adminId,
                hostelName: admin.hostelName,
                role: 'Warden' // Adding role for frontend consistency
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server Error during login' });
    }
});

module.exports = router;
