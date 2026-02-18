const Student = require('../models/Student');

// In-memory storage to satisfy "don't store in backend database" requirement
let mockLeaves = [];

// Apply for Leave (Student)
exports.applyLeave = async (req, res) => {
    try {
        // User ID fix: use req.user.id instead of req.user._id
        const studentId = req.user.id;

        // Fetch student details to simulate population since we aren't using DB relations
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const { fromDate, toDate, leaveType, reason, destinationAddress, parentContact } = req.body;

        // Validation
        if (!fromDate || !toDate || !leaveType || !reason || !destinationAddress || !parentContact) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Handle File Upload
        let documentUrl = '';
        if (req.file) {
            documentUrl = req.file.path;
        }

        const newLeave = {
            _id: Date.now().toString(), // Mock ID
            studentId: {
                _id: student._id,
                name: student.name,
                enrollmentNumber: student.enrollmentNumber,
                department: student.department,
                year: student.year,
                roomNumber: student.roomNumber || 'N/A'
            },
            fromDate,
            toDate,
            leaveType,
            reason,
            destinationAddress,
            parentContact,
            documentUrl,
            status: 'Pending',
            createdAt: new Date(),
            hostelName: 'Main' // Mock default or fetch from student if exists
        };

        // Store in memory
        mockLeaves.push(newLeave);

        res.status(201).json({ message: 'Leave Request Submitted Successfully', leave: newLeave });

    } catch (error) {
        console.error('Error applying for leave:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get Student's Leaves (Student)
exports.getStudentLeaves = async (req, res) => {
    try {
        // Filter in-memory array
        const leaves = mockLeaves
            .filter(l => l.studentId._id.toString() === req.user.id)
            .sort((a, b) => b.createdAt - a.createdAt);

        res.status(200).json(leaves);
    } catch (error) {
        console.error('Error fetching student leaves:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get All Leaves (Admin)
exports.getAllLeaves = async (req, res) => {
    try {
        // Return in-memory array sorted by date
        const leaves = [...mockLeaves].sort((a, b) => b.createdAt - a.createdAt);
        res.status(200).json(leaves);
    } catch (error) {
        console.error('Error fetching all leaves:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update Leave Status (Admin)
exports.updateLeaveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const leaveIndex = mockLeaves.findIndex(l => l._id === id);
        if (leaveIndex === -1) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        mockLeaves[leaveIndex].status = status;
        if (status === 'Approved') {
            mockLeaves[leaveIndex].approvedDate = Date.now();
        }

        res.status(200).json({ message: `Leave Request ${status}`, leave: mockLeaves[leaveIndex] });

    } catch (error) {
        console.error('Error updating leave status:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
