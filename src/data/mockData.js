export const CURRENT_STUDENT = {
  id: 'STU-2024-042',
  name: 'Aarav Sharma',
  rollNo: '2024-CS-042',
  department: 'Computer Science & Engineering',
  email: 'aarav.sharma@institution.edu',
  phone: '+91 98765 43210',
  academicYear: '3rd Year B.Tech',
  society: 'Coding & Robotics Club',
  avatarInitials: 'AS'
};

export const CURRENT_ADMIN = {
  id: 'ADM-SADC-014',
  name: 'Dr. Vikramaditya Roy',
  staffId: 'STAFF-ADM-8801',
  designation: 'Associate Dean (Student Affairs)',
  department: 'Office of Student Affairs & Development',
  email: 'v.roy@institution.edu',
  officeRoom: 'SADC Building, Admin Block Room 204',
  avatarInitials: 'VR'
};

export const INITIAL_PROPOSALS = [
  {
    id: 'PROP-2026-095',
    title: 'Robotics Workshop on ROS2 & Embedded Systems',
    category: 'Academic & Technical',
    organizer: 'Robotics & Automation Society',
    applicantName: 'Aarav Sharma',
    applicantRollNo: '2024-CS-042',
    applicantEmail: 'aarav.sharma@institution.edu',
    department: 'Computer Science & Engineering',
    proposedDate: '2026-10-25',
    proposedTime: '09:30 AM - 04:30 PM',
    venue: 'Seminar Hall 3, Academic Block B',
    expectedParticipants: 120,
    facultyAdvisor: 'Dr. Meera Nambiar (Dept of ECE)',
    summary: 'A hands-on intensive workshop focusing on ROS2 fundamentals, micro-ROS microcontrollers, and autonomous navigation algorithms for 2nd and 3rd-year engineering undergraduates.',
    budgetTotal: 58000,
    budgetBreakdown: [
      { item: 'Component Kits & Microcontrollers Rental', amount: 32000, notes: '15 hardware kits for hands-on sessions' },
      { item: 'Guest Speaker Remuneration & TA', amount: 18000, notes: '2 Industry experts from Robotics Lab' },
      { item: 'Certificates, Printing & Refreshments', amount: 8000, notes: 'Tea, snacks, and official certificates' }
    ],
    status: 'Pending',
    submittedAt: '2026-09-24T10:15:00Z',
    adminRemarks: '',
    reviewedBy: '',
    reviewedAt: null,
    attachmentName: 'ROS2_Workshop_Syllabus_Budget_Doc.pdf'
  },
  {
    id: 'PROP-2026-089',
    title: 'Annual Inter-College Hackathon "HackSphere 2026"',
    category: 'Inter-College Competition',
    organizer: 'Coding Society & SADC Tech Division',
    applicantName: 'Aarav Sharma',
    applicantRollNo: '2024-CS-042',
    applicantEmail: 'aarav.sharma@institution.edu',
    department: 'Computer Science & Engineering',
    proposedDate: '2026-10-12',
    proposedTime: '08:00 AM (24 Hours Overnight)',
    venue: 'Central Library Auditorium & CS Labs',
    expectedParticipants: 250,
    facultyAdvisor: 'Prof. Rajesh K. Gupta (HOD CSE)',
    summary: '24-hour hackathon bringing together top engineering talent from 15 regional institutions to solve real-world sustainability and AI challenges.',
    budgetTotal: 145000,
    budgetBreakdown: [
      { item: 'Cash Prizes & Trophies', amount: 75000, notes: '1st: ₹40k, 2nd: ₹25k, 3rd: ₹10k' },
      { item: 'Overnight Catering & Meals', amount: 50000, notes: 'Dinner, midnight snacks, breakfast for 280 pax' },
      { item: 'Banners, ID Badges & Logistics', amount: 20000, notes: 'Stage backdrop, vinyl banners, badges' }
    ],
    status: 'Approved',
    submittedAt: '2026-09-18T14:30:00Z',
    adminRemarks: 'Sanctioned by SADC Executive Board. Venue booked. Security supervisor must be deployed for overnight lab access.',
    reviewedBy: 'Dr. Vikramaditya Roy',
    reviewedAt: '2026-09-20T11:00:00Z',
    attachmentName: 'HackSphere_2026_Full_Proposal_V2.pdf'
  },
  {
    id: 'PROP-2026-092',
    title: 'Campus Clean-Green Drive & Botanical Naming Project',
    category: 'Community & Environment',
    organizer: 'Eco-Club SADC Unit',
    applicantName: 'Ananya Deshmukh',
    applicantRollNo: '2024-EV-012',
    applicantEmail: 'ananya.d@institution.edu',
    department: 'Environmental Engineering',
    proposedDate: '2026-10-18',
    proposedTime: '07:00 AM - 12:00 PM',
    venue: 'Main Campus Quadrangle & Botanical Garden',
    expectedParticipants: 180,
    facultyAdvisor: 'Dr. S. K. Mukherjee',
    summary: 'Planting 150 native tree saplings across the south campus perimeter and installing QR-coded educational botanical tags on mature campus flora.',
    budgetTotal: 32000,
    budgetBreakdown: [
      { item: 'Tree Saplings & Soil Fertilizers', amount: 18000, notes: '150 native saplings from state nursery' },
      { item: 'Weatherproof QR Botanical Tags', amount: 9000, notes: 'Acrylic engraved tree identification plates' },
      { item: 'Refreshments & Volunteer Gloves', amount: 5000, notes: 'Reusable gloves & lemonade counter' }
    ],
    status: 'Pending',
    submittedAt: '2026-09-22T09:00:00Z',
    adminRemarks: '',
    reviewedBy: '',
    reviewedAt: null,
    attachmentName: 'Green_Drive_Plan_Location_Map.pdf'
  },
  {
    id: 'PROP-2026-078',
    title: 'SADC Cultural Evening "Sanskriti 2026"',
    category: 'Cultural & Performing Arts',
    organizer: 'Student Cultural Council',
    applicantName: 'Rohan Verma',
    applicantRollNo: '2023-ME-088',
    applicantEmail: 'rohan.v@institution.edu',
    department: 'Mechanical Engineering',
    proposedDate: '2026-11-05',
    proposedTime: '05:00 PM - 09:30 PM',
    venue: 'Open Air Amphitheatre',
    expectedParticipants: 850,
    facultyAdvisor: 'Dr. Sunita Rao (Cultural Convener)',
    summary: 'Annual showcase of classical music, folk dance performances, theatrical drama, and instrumental recitals featuring student societies.',
    budgetTotal: 28000,
    budgetBreakdown: [
      { item: 'Professional Stage Sound & Lighting Equipment', amount: 16000, notes: 'Line array audio & LED stage spots' },
      { item: 'Costumes & Makeup Artist Stipend', amount: 8000, notes: 'Rentals for 45 performing troupe members' },
      { item: 'Stage Backdrop & Event Certificates', amount: 4000, notes: 'Framed certificates & event trophies' }
    ],
    status: 'Approved',
    submittedAt: '2026-09-10T16:20:00Z',
    adminRemarks: 'Approved subject to strict compliance with 09:30 PM decibel cutoff. Security team alerted.',
    reviewedBy: 'Dr. Vikramaditya Roy',
    reviewedAt: '2026-09-12T10:45:00Z',
    attachmentName: 'Sanskriti_Cultural_Night_Budget.pdf'
  },
  {
    id: 'PROP-2026-064',
    title: 'DJ Music Fest Night Extension Request',
    category: 'Social & Recreational',
    organizer: 'Music & DJ Society',
    applicantName: 'Kabir Mehta',
    applicantRollNo: '2023-CE-019',
    applicantEmail: 'kabir.m@institution.edu',
    department: 'Civil Engineering',
    proposedDate: '2026-09-30',
    proposedTime: '07:00 PM - 01:00 AM (Overnight)',
    venue: 'Student Activity Center Lawn',
    expectedParticipants: 600,
    facultyAdvisor: 'Prof. A. P. Thorne',
    summary: 'Request for high-decibel commercial DJ concert equipment setup and past-midnight authorization on campus grounds.',
    budgetTotal: 120000,
    budgetBreakdown: [
      { item: 'External DJ Artist Hiring Fee', amount: 80000, notes: 'External commercial performance contract' },
      { item: 'Heavy Bass Sound Rig Rental', amount: 40000, notes: 'Subwoofers & concert lighting' }
    ],
    status: 'Rejected',
    submittedAt: '2026-09-02T11:10:00Z',
    adminRemarks: 'Rejected as per University Senate Resolution #402. High decibel commercial concerts post 10 PM are prohibited during mid-term examination week.',
    reviewedBy: 'Dr. Vikramaditya Roy',
    reviewedAt: '2026-09-04T15:00:00Z',
    attachmentName: 'DJ_Night_Proposal_Rev.pdf'
  }
];

export const GALLERY_ALBUMS = [
  {
    id: 'ALB-2026-01',
    title: 'Annual Inter-Departmental Sports Meet 2026',
    category: 'Sports & Athletics',
    date: 'October 2026',
    photoCount: 42,
    coverUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    description: 'Highlights from track and field events, football finals, and championship trophy distribution at the Main Athletics Ground.',
    uploadedBy: 'SADC Media Cell'
  },
  {
    id: 'ALB-2026-02',
    title: 'Robotics & AI National Symposium Expositions',
    category: 'Technical',
    date: 'September 2026',
    photoCount: 28,
    coverUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    description: 'Student prototype demonstrations, autonomous rover arena competitions, and paper presentations.',
    uploadedBy: 'Robotics Society'
  },
  {
    id: 'ALB-2026-03',
    title: 'Orientation & Student Societies Inauguration Ceremony',
    category: 'Institutional',
    date: 'August 2026',
    photoCount: 56,
    coverUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80',
    description: 'Welcoming the Batch of 2030, keynote address by Dean SADC, and society enrollment stalls in the Academic Quad.',
    uploadedBy: 'Dean Office'
  },
  {
    id: 'ALB-2026-04',
    title: 'Community Outreach & Blood Donation Drive',
    category: 'Social Service',
    date: 'July 2026',
    photoCount: 19,
    coverUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&w=800&q=80',
    description: 'Red Cross blood donation camp organized at the Student Center, collecting over 240 units for local healthcare units.',
    uploadedBy: 'NSS Unit'
  }
];

export const ACTIVITIES_TIMELINE = [
  {
    id: 'ACT-2026-004',
    title: 'SADC Executive Council Semester Budget Sanction Meeting',
    date: '2026-10-10',
    academicTerm: 'Autumn Semester 2026-27',
    category: 'Administrative Governance',
    coordinator: 'Dr. Vikramaditya Roy',
    venue: 'Senate Conference Room A',
    summary: 'Evaluation of 42 student activity proposals. Total of ₹8.4 Lakhs disbursed across technical, cultural, and sports societies for Q4.',
    status: 'Completed',
    photosCount: 4,
    tags: ['Budget Sanction', 'Senate', 'Financial Allocation']
  },
  {
    id: 'ACT-2026-003',
    title: 'National Youth Leadership Summit Delegation',
    date: '2026-09-28',
    academicTerm: 'Autumn Semester 2026-27',
    category: 'Student Development',
    coordinator: 'Prof. Anjali Sharma',
    venue: 'National Convention Center',
    summary: 'A 12-member student delegation represented the institution at the National Student Governance & Leadership Summit.',
    status: 'Completed',
    photosCount: 12,
    tags: ['Leadership', 'Delegation', 'National Level']
  },
  {
    id: 'ACT-2026-002',
    title: 'Campus Blood Donation & Health Screening Camp',
    date: '2026-09-15',
    academicTerm: 'Autumn Semester 2026-27',
    category: 'Social Responsibility',
    coordinator: 'SADC Welfare Committee & NSS',
    venue: 'Student Activity Center Ground Floor',
    summary: 'Organized in partnership with City Blood Bank & Rotary Club. 240+ student & faculty donors participated.',
    status: 'Completed',
    photosCount: 8,
    tags: ['Welfare', 'Health', 'NSS']
  },
  {
    id: 'ACT-2026-001',
    title: 'Freshman Clubs Fair & Societies Registration',
    date: '2026-08-20',
    academicTerm: 'Autumn Semester 2026-27',
    category: 'Student Onboarding',
    coordinator: 'SADC Student Steering Council',
    venue: 'Main Campus Pavilion',
    summary: '22 registered clubs established interactive stalls for incoming undergraduate students. Over 1,200 club memberships registered.',
    status: 'Completed',
    photosCount: 24,
    tags: ['Clubs Fair', 'Orientation', 'Societies']
  }
];

export const ANNOUNCEMENTS = [
  {
    id: 'ANN-01',
    title: 'Deadline for Autumn Semester Event Proposal Submissions',
    date: '2026-09-28',
    priority: 'High',
    body: 'All student societies planning events between October 15 and November 30 must submit formal financial proposals via the SADC portal by 05:00 PM on October 05.'
  },
  {
    id: 'ANN-02',
    title: 'Updated Policy on Sound & Venue Permissions (Circular #44/2026)',
    date: '2026-09-20',
    priority: 'Normal',
    body: 'Late night sound system approvals post 10:00 PM require joint clearance from the Security Chief and Faculty Convener. Refer to the policy document on the portal.'
  }
];
