const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    enrollmentNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, // Hashed password
        required: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
