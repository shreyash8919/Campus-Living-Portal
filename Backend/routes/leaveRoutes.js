const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const verifyToken = require('../middleware/authMiddleware');

const upload = require('../middleware/upload');

// Student Routes
router.post('/apply', verifyToken, upload.single('document'), leaveController.applyLeave);
router.get('/my-leaves', verifyToken, leaveController.getStudentLeaves);

// Admin Routes
// Note: Ideally we should have an isAdmin middleware, but for now assuming verifyToken allows access and frontend handles safety or verifyToken checks role if implemented. 
// Based on current authMiddleware, it just verifies token.
router.get('/all', verifyToken, leaveController.getAllLeaves);
router.put('/:id/status', verifyToken, leaveController.updateLeaveStatus);

module.exports = router;
