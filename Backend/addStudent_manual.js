const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Student = require('./models/Student');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/campus_living_portal';

const addStudent = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const studentData = {
            enrollmentNumber: "EN123456",
            password: "password123",
            name: "John Doe",
            department: "Computer Science",
            year: 3
        };

        // Check if student exists
        const existing = await Student.findOne({ enrollmentNumber: studentData.enrollmentNumber });
        if (existing) {
            console.log('⚠️ Student already exists');
            process.exit(0);
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(studentData.password, salt);

        // Create student
        const newStudent = new Student({
            ...studentData,
            password: hashedPassword
        });

        await newStudent.save();
        console.log('✅ Student added successfully');
        console.log(`Enrollment: ${studentData.enrollmentNumber}`);
        console.log(`Password: ${studentData.password}`);

    } catch (error) {
        console.error('❌ Error adding student:', error);
    } finally {
        mongoose.disconnect();
    }
};

addStudent();
