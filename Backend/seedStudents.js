const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Student = require('./models/Student');
const dotenv = require('dotenv');

dotenv.config();

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/campus_living_portal';

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('✅ MongoDB Connected');
        await seedStudents();
    })
    .catch(err => console.error(err));

const seedStudents = async () => {
    try {
        // Clear existing students (Optional, be careful in production)
        // await Student.deleteMany({}); 

        const students = [
            {
                enrollmentNumber: "EN123456",
                password: "password123", // Will be hashed
                name: "John Doe",
                department: "Computer Science",
                year: 3
            },
            {
                enrollmentNumber: "EN654321",
                password: "password456",
                name: "Jane Smith",
                department: "Electrical Engineering",
                year: 2
            }
        ];

        for (const s of students) {
            // Check if student already exists
            const existing = await Student.findOne({ enrollmentNumber: s.enrollmentNumber });
            if (existing) {
                console.log(`⚠️ Student ${s.enrollmentNumber} already exists`);
                continue;
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(s.password, salt);

            // Create new student
            const newStudent = new Student({
                enrollmentNumber: s.enrollmentNumber,
                password: hashedPassword,
                name: s.name,
                department: s.department,
                year: s.year
            });

            await newStudent.save();
            console.log(`✅ Student ${s.name} added successfully`);
        }

        console.log('🎉 Seeding Complete');
        mongoose.connection.close();
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        mongoose.connection.close();
    }
};
