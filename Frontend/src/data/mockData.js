// ==================== HOSTEL DATA ====================
export const girlsHostels = [
  { id: 1, name: 'Saraswati', capacity: 144, type: 'Girls' },
  { id: 2, name: 'Shwetambara', capacity: 144, type: 'Girls' },
];

export const boysHostels = [
  { id: 3, name: 'Lenyadri', capacity: 112, type: 'Boys' },
  { id: 4, name: 'Bhimashankar', capacity: 112, type: 'Boys' },
  { id: 5, name: 'Shivneri', capacity: 112, type: 'Boys' },
];

export const hostelFacilities = {
  girls: [
    'Sanitary Napkin Vending Machine',
    'Solar Water Heater',
    'CCTV Camera',
    'Aqua Guard Water Filter',
    'Mess Facility',
  ],
  boys: [
    'Solar Water Heater',
    'CCTV Camera',
    'Aqua Guard Water Filter',
    'Mess Facility',
  ],
};

export const rectors = {
  girls: {
    name: 'Smt. Priya Narayandas Malu',
    designation: 'Lecturer in Electronics Engineering',
    contact: '',
  },
  boys: {
    name: 'Dr. M. R. Umbarkar',
    designation: 'Lecturer in Electronics Engineering',
    contact: '7972565738',
  },
};

// ==================== NOTICE DATA ====================
export const publicNotices = [
  {
    id: 1,
    title: 'Hostel Admission Open – Academic Year 2025–26',
    description: 'Applications are invited from eligible students for hostel admission for the academic year 2025-26. Students must apply before the last date with all necessary documents.',
    date: '2025-06-12',
    issuedBy: 'Hostel Office',
    status: 'Important',
    type: 'Hostel Admission Open',
    fullContent: 'Government Polytechnic Awasari (Kh.) invites applications for hostel admission for academic year 2025-26. Eligible students should submit their applications along with SSC marksheet, previous year result, two passport size photos, and Aadhar card copy. Selection will be based on merit.',
  },
  {
    id: 2,
    title: 'Last Date for Hostel Admission – 30th June 2025',
    description: 'All students applying for hostel admission must submit their applications by 30th June 2025. Late applications will not be accepted.',
    date: '2025-06-15',
    issuedBy: 'Hostel Office',
    status: 'Urgent',
    type: 'Last Date for Hostel Admission',
    fullContent: 'This is to inform all students that the last date for hostel admission is 30th June 2025. Students must submit the form along with required documents. No applications will be accepted after the deadline.',
  },
  {
    id: 3,
    title: 'Selected Students List – Boys Hostel 2025-26',
    description: 'The list of selected students for Boys Hostel accommodation has been published. Students are requested to check their names.',
    date: '2025-07-05',
    issuedBy: 'Hostel Office',
    status: 'New',
    type: 'Selected Students List',
    fullContent: 'The merit-based selection list for boys hostel accommodation for academic year 2025-26 has been finalized. Selected students must complete the admission process within 7 days.',
  },
  {
    id: 4,
    title: 'Room Allotment Schedule – All Hostels',
    description: 'Room allotment for all hostels will be conducted on 10th July 2025. Students must be present with original documents.',
    date: '2025-07-01',
    issuedBy: 'Hostel Office',
    status: 'Important',
    type: 'Room Allotment Schedule',
  },
  {
    id: 5,
    title: 'Mess Menu Updated – July 2025',
    description: 'New monthly mess menu has been updated. Students are requested to check the latest menu from their dashboard.',
    date: '2025-07-01',
    issuedBy: 'Warden',
    status: 'New',
    type: 'Mess-related circulars',
  },
  {
    id: 6,
    title: 'Hostel Rules & Regulations – Reminder',
    description: 'All hostel students are reminded to follow hostel rules. Any violation will result in disciplinary action.',
    date: '2025-06-20',
    issuedBy: 'Warden',
    status: 'Important',
    type: 'General hostel circulars',
  },
];

// ==================== STUDENT DATA (MOCK LOGGED IN) ====================
export const mockStudent = {
  id: 'STU001',
  enrollmentNo: 'GPA2024001',
  fullName: 'Rahul Sharma',
  photo: null,
  dob: '2006-05-15',
  gender: 'Male',
  category: 'OBC',
  mobile: '9876543210',
  email: 'rahul.sharma@student.gpa.edu',
  permanentAddress: '123, Main Road, Pune, Maharashtra - 411001',
  instituteName: 'Government Polytechnic Awasari',
  department: 'Computer Engineering',
  yearOfStudy: '2nd Year',
  rollNo: 'CE-045',
  prn: '2024CE045',
  admissionType: 'CAP',
  hostelType: 'Boys',
  hostelName: 'Shivneri',
  roomNumber: 'B-204',
  floorNumber: '2nd Floor',
  bedNumber: 'Bed A',
  dateOfJoining: '2024-07-15',
  hostelFeeStatus: 'Paid',
  academicYear: '2024-25',
  currentStatus: 'Active',
  emergencyContact: {
    parentName: 'Mr. Suresh Sharma',
    relationship: 'Father',
    contactNumber: '9876543211',
    address: '123, Main Road, Pune, Maharashtra - 411001',
  },
  documents: [
    { name: 'Hostel Admission Letter', type: 'pdf', uploadedDate: '2024-07-10' },
    { name: 'Fee Receipt', type: 'pdf', uploadedDate: '2024-07-15' },
    { name: 'ID Proof (Aadhar Card)', type: 'pdf', uploadedDate: '2024-07-10' },
    { name: 'Undertaking / Rules Acceptance', type: 'pdf', uploadedDate: '2024-07-10' },
  ],
  roommates: [
    { name: 'Amit Patil', department: 'Mechanical Engineering' },
    { name: 'Vijay Jadhav', department: 'Electrical Engineering' },
  ],
  assets: [
    { item: 'Cot', status: 'Working' },
    { item: 'Mattress', status: 'Working' },
    { item: 'Table', status: 'Working' },
    { item: 'Chair', status: 'Working' },
    { item: 'Locker', status: 'Working' },
    { item: 'Tube Light', status: 'Working' },
    { item: 'Fan', status: 'Damaged' },
  ],
};

// ==================== DASHBOARD NOTICES ====================
export const dashboardNotices = [
  {
    id: 101,
    title: 'Water Supply Interruption on 15th July',
    category: 'General',
    dateTime: '2025-07-10 10:00 AM',
    issuedBy: 'Warden',
    description: 'Water supply will be interrupted on 15th July due to maintenance work. Students are advised to store water.',
    priority: 'Important',
    readStatus: 'Unseen',
    pinned: true,
    expiryDate: '2025-07-16',
    attachment: null,
  },
  {
    id: 102,
    title: 'Mess Timing Change – Effective Immediately',
    category: 'Mess',
    dateTime: '2025-07-09 02:30 PM',
    issuedBy: 'Hostel Office',
    description: 'Mess timings have been revised. Breakfast: 7:30-9:00 AM, Lunch: 12:30-2:00 PM, Dinner: 7:30-9:00 PM.',
    priority: 'Urgent',
    readStatus: 'Unseen',
    pinned: false,
    expiryDate: null,
    attachment: 'mess_timing_circular.pdf',
  },
  {
    id: 103,
    title: 'Annual Hostel Day Celebration',
    category: 'Event',
    dateTime: '2025-07-08 11:00 AM',
    issuedBy: 'Hostel Office',
    description: 'Annual Hostel Day will be celebrated on 20th July. All students are invited to participate in cultural activities.',
    priority: 'Normal',
    readStatus: 'Seen',
    pinned: false,
    expiryDate: '2025-07-21',
    attachment: null,
  },
  {
    id: 104,
    title: 'Fire Safety Drill – Mandatory Participation',
    category: 'Safety',
    dateTime: '2025-07-07 09:00 AM',
    issuedBy: 'Warden',
    description: 'Fire safety drill will be conducted on 12th July at 10:00 AM. All hostel students must participate. Non-attendance will be noted.',
    priority: 'Urgent',
    readStatus: 'Seen',
    pinned: true,
    expiryDate: '2025-07-13',
    attachment: 'fire_safety_guidelines.pdf',
  },
];

// ==================== COMPLAINT DATA ====================
export const studentComplaints = [
  {
    id: 'CMP001',
    type: 'Electricity',
    description: 'The ceiling fan in Room No. B-204 is not working properly and creates loud noise, making it difficult to study.',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2025-07-08',
    wardenRemark: 'Electrician has been assigned. Issue will be resolved by today evening.',
    updatedAt: '2025-07-09',
  },
  {
    id: 'CMP002',
    type: 'Water',
    description: 'Water leakage in bathroom of Room B-204. Floor remains wet causing slippery conditions.',
    priority: 'Medium',
    status: 'Pending',
    createdAt: '2025-07-10',
    wardenRemark: '',
    updatedAt: null,
  },
  {
    id: 'CMP003',
    type: 'Mess',
    description: 'Food quality has deteriorated in the past week. Rice is undercooked and dal lacks proper seasoning.',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2025-06-25',
    wardenRemark: 'Mess committee has been informed. New cook has been assigned.',
    updatedAt: '2025-06-28',
  },
];

// ==================== MESS DATA ====================
export const messMenu = {
  hostelName: 'Shivneri - Boys Hostel',
  menuImage: null,
  messFees: {
    monthly: 2500,
    perDay: 85,
  },
  weeklyMenu: {
    Monday: { breakfast: 'Poha, Tea', lunch: 'Dal Rice, Chapati, Sabzi', dinner: 'Chapati, Paneer Sabzi, Rice' },
    Tuesday: { breakfast: 'Upma, Tea', lunch: 'Varan Bhat, Papad', dinner: 'Chapati, Mix Veg, Dal Rice' },
    Wednesday: { breakfast: 'Idli Sambar, Tea', lunch: 'Rajma Rice, Salad', dinner: 'Chapati, Aloo Gobi, Rice' },
    Thursday: { breakfast: 'Paratha, Curd, Tea', lunch: 'Dal Rice, Chapati, Bhaji', dinner: 'Puri Bhaji, Rice' },
    Friday: { breakfast: 'Misal Pav, Tea', lunch: 'Chole Rice, Chapati', dinner: 'Chapati, Dal Fry, Rice' },
    Saturday: { breakfast: 'Poha, Tea', lunch: 'Kadhi Rice, Papad', dinner: 'Biryani, Raita' },
    Sunday: { breakfast: 'Bread Butter, Egg, Tea', lunch: 'Special Thali', dinner: 'Chapati, Matar Paneer, Rice' },
  },
};

// ==================== LEAVE DATA ====================
export const leaveApplications = [
  {
    id: 'LV001',
    leaveType: 'Home Visit',
    fromDate: '2025-07-15',
    fromTime: '10:00 AM',
    toDate: '2025-07-17',
    toTime: '06:00 PM',
    reason: 'Going home for family function. My sister\'s engagement ceremony is on 16th July.',
    destination: '123, Main Road, Pune',
    parentContact: '9876543211',
    status: 'Approved',
    rejectionReason: '',
  },
  {
    id: 'LV002',
    leaveType: 'Medical Emergency',
    fromDate: '2025-07-20',
    fromTime: '08:00 AM',
    toDate: '2025-07-20',
    toTime: '06:00 PM',
    reason: 'Doctor appointment at Sassoon Hospital for regular health checkup.',
    destination: 'Sassoon Hospital, Pune',
    parentContact: '9876543211',
    status: 'Pending',
    rejectionReason: '',
  },
];

// ==================== EMERGENCY CONTACTS ====================
export const emergencyContacts = [
  { role: 'Warden (Boys Hostel)', name: 'Dr. M. R. Umbarkar', phone: '7972565738' },
  { role: 'Security Office', name: 'Security Guard Room', phone: '9970723236' },
  { role: 'Ambulance', name: 'Emergency Ambulance', phone: '108' },
  { role: 'Fire Brigade', name: 'Fire Emergency', phone: '101' },
  { role: 'Police', name: 'Police Station', phone: '100' },
  { role: 'Hospital', name: 'Primary Health Center Awasari', phone: '02135-222333' },
];

// ==================== ADMIN MOCK DATA ====================
export const allComplaints = [
  {
    id: 'CMP001',
    studentId: 'STU001',
    studentName: 'Rahul Sharma',
    hostelName: 'Shivneri',
    type: 'Electricity',
    description: 'The ceiling fan in Room No. B-204 is not working properly and creates loud noise.',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2025-07-08',
    wardenRemark: 'Electrician has been assigned. Issue will be resolved by today evening.',
    updatedAt: '2025-07-09',
    assignedTo: 'Electrician',
  },
  {
    id: 'CMP004',
    studentId: 'STU002',
    studentName: 'Amit Patil',
    hostelName: 'Shivneri',
    type: 'Room',
    description: 'Window glass broken in Room B-102. Cold air enters at night.',
    priority: 'High',
    status: 'Pending',
    createdAt: '2025-07-10',
    wardenRemark: '',
    updatedAt: null,
    assignedTo: '',
  },
  {
    id: 'CMP005',
    studentId: 'STU003',
    studentName: 'Vijay Jadhav',
    hostelName: 'Shivneri',
    type: 'Security',
    description: 'Main gate CCTV camera is not functioning since last 2 days.',
    priority: 'Medium',
    status: 'Pending',
    createdAt: '2025-07-09',
    wardenRemark: '',
    updatedAt: null,
    assignedTo: '',
  },
  {
    id: 'CMP006',
    studentId: 'STU004',
    studentName: 'Priya Deshmukh',
    hostelName: 'Saraswati',
    type: 'Water',
    description: 'Hot water not available in the morning. Solar heater seems malfunctioning.',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2025-07-07',
    wardenRemark: 'Technician to visit tomorrow.',
    updatedAt: '2025-07-08',
    assignedTo: 'Plumber',
  },
];

export const allLeaveRequests = [
  {
    id: 'LV001',
    studentId: 'STU001',
    studentName: 'Rahul Sharma',
    hostelName: 'Shivneri',
    roomNo: 'B-204',
    leaveType: 'Home Visit',
    fromDate: '2025-07-15',
    toDate: '2025-07-17',
    reason: 'Going home for family function.',
    parentContact: '9876543211',
    status: 'Approved',
  },
  {
    id: 'LV003',
    studentId: 'STU002',
    studentName: 'Amit Patil',
    hostelName: 'Shivneri',
    roomNo: 'B-102',
    leaveType: 'Medical Emergency',
    fromDate: '2025-07-12',
    toDate: '2025-07-12',
    reason: 'Dentist appointment at nearby hospital.',
    parentContact: '9876543222',
    status: 'Pending',
  },
];

export const exitRequests = [
  {
    id: 'EXIT001',
    studentId: 'STU010',
    studentName: 'Suresh Kamble',
    hostelName: 'Shivneri',
    roomNo: 'B-301',
    exitReason: 'Course completed',
    proposedExitDate: '2025-05-30',
    status: 'Pending Verification',
    assets: [
      { item: 'Table', status: 'Working' },
      { item: 'Chair', status: 'Working' },
      { item: 'Locker', status: 'Damaged' },
      { item: 'Fan', status: 'Working' },
      { item: 'Tube Light', status: 'Working' },
    ],
  },
];
