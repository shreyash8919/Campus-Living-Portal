const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const verifyToken = require('../middleware/authMiddleware');

// 1. Student Login Route
router.post('/login', async (req, res) => {
    try {
        const { enrollmentNumber, password } = req.body;

        // Validation
        if (!enrollmentNumber || !password) {
            return res.status(400).json({ message: 'Enrollment Number and Password are required' });
        }

        // Check if student exists
        const student = await Student.findOne({ enrollmentNumber });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: student._id, enrollmentNumber: student.enrollmentNumber },
            process.env.JWT_SECRET || 'secretKey',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login Successful',
            token,
            student: {
                id: student._id,
                name: student.name,
                enrollmentNumber: student.enrollmentNumber,
                department: student.department,
                year: student.year
            }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// 2. Protected Dashboard Data Route (Example)
router.get('/dashboard', verifyToken, async (req, res) => {
    try {
        const student = await Student.findById(req.user.id).select('-password'); // Exclude password
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student data' });
    }
});

module.exports = router;
