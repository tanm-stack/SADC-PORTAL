// Persistent LocalStorage Service for SADC Institutional Portal
// Handles persistent data storage, session management, and CRUD operations

const STORAGE_KEYS = {
  PROPOSALS: 'sadc_proposals',
  GALLERY: 'sadc_gallery_albums',
  ACTIVITIES: 'sadc_activities_timeline',
  ANNOUNCEMENTS: 'sadc_announcements',
  AUTH_SESSION: 'sadc_auth_session'
};

// Initial production starter data templates for SADC institutional operations
const INITIAL_STARTER_PROPOSALS = [
  {
    id: 'PROP-2026-001',
    title: 'Robotics Workshop on ROS2 & Embedded Systems',
    category: 'Academic & Technical',
    organizer: 'Robotics & Automation Society',
    applicantName: 'Aarav Sharma',
    applicantRollNo: '2024-CS-042',
    applicantEmail: 'aarav.sharma@stpallotti.edu.in',
    department: 'Computer Science & Engineering',
    proposedDate: '2026-10-25',
    proposedTime: '09:30 AM - 04:30 PM',
    venue: 'Seminar Hall 3, Academic Block B',
    expectedParticipants: 120,
    facultyAdvisor: 'Dr. Meera Nambiar (Dept of ECE)',
    summary: 'A hands-on intensive workshop focusing on ROS2 fundamentals, micro-ROS microcontrollers, and autonomous navigation algorithms for undergraduate students.',
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
    id: 'PROP-2026-002',
    title: 'Annual Inter-College Hackathon "HackSphere 2026"',
    category: 'Inter-College Competition',
    organizer: 'Coding Society & SADC Tech Division',
    applicantName: 'Aarav Sharma',
    applicantRollNo: '2024-CS-042',
    applicantEmail: 'aarav.sharma@stpallotti.edu.in',
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
    adminRemarks: 'Sanctioned by SADC Executive Board. Venue booked. Security supervisor deployed for overnight lab access.',
    reviewedBy: 'Dr. Vikramaditya Roy',
    reviewedAt: '2026-09-20T11:00:00Z',
    attachmentName: 'HackSphere_2026_Full_Proposal_V2.pdf'
  }
];

const INITIAL_STARTER_GALLERY = [
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
  }
];

const INITIAL_STARTER_ACTIVITIES = [
  {
    id: 'ACT-2026-001',
    title: 'SADC Executive Council Semester Budget Sanction Meeting',
    date: '2026-10-10',
    academicTerm: 'Autumn Semester 2026-27',
    category: 'Administrative Governance',
    coordinator: 'Dr. Vikramaditya Roy',
    venue: 'Senate Conference Room A',
    summary: 'Evaluation of student activity proposals. Total funds disbursed across technical, cultural, and sports societies.',
    status: 'Completed',
    photosCount: 4,
    tags: ['Budget Sanction', 'Senate', 'Financial Allocation']
  }
];

const INITIAL_STARTER_ANNOUNCEMENTS = [
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

// Helper to safely get from localStorage (SSR-safe)
const getItem = (key, defaultVal) => {
  if (typeof window === 'undefined') return defaultVal;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return defaultVal;
  }
};

// Helper to safely set in localStorage (SSR-safe)
const setItem = (key, val) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage:`, e);
  }
};

// Public Storage API
export const getStoredProposals = () => {
  if (typeof window === 'undefined') return INITIAL_STARTER_PROPOSALS;
  const existing = localStorage.getItem(STORAGE_KEYS.PROPOSALS);
  if (!existing) {
    setItem(STORAGE_KEYS.PROPOSALS, INITIAL_STARTER_PROPOSALS);
    return INITIAL_STARTER_PROPOSALS;
  }
  try {
    return JSON.parse(existing);
  } catch {
    return INITIAL_STARTER_PROPOSALS;
  }
};

export const saveStoredProposals = (proposals) => {
  setItem(STORAGE_KEYS.PROPOSALS, proposals);
};

export const getStoredGallery = () => {
  if (typeof window === 'undefined') return INITIAL_STARTER_GALLERY;
  const existing = localStorage.getItem(STORAGE_KEYS.GALLERY);
  if (!existing) {
    setItem(STORAGE_KEYS.GALLERY, INITIAL_STARTER_GALLERY);
    return INITIAL_STARTER_GALLERY;
  }
  try {
    return JSON.parse(existing);
  } catch {
    return INITIAL_STARTER_GALLERY;
  }
};

export const saveStoredGallery = (albums) => {
  setItem(STORAGE_KEYS.GALLERY, albums);
};

export const getStoredActivities = () => {
  if (typeof window === 'undefined') return INITIAL_STARTER_ACTIVITIES;
  const existing = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
  if (!existing) {
    setItem(STORAGE_KEYS.ACTIVITIES, INITIAL_STARTER_ACTIVITIES);
    return INITIAL_STARTER_ACTIVITIES;
  }
  try {
    return JSON.parse(existing);
  } catch {
    return INITIAL_STARTER_ACTIVITIES;
  }
};

export const saveStoredActivities = (activities) => {
  setItem(STORAGE_KEYS.ACTIVITIES, activities);
};

export const getStoredAnnouncements = () => {
  if (typeof window === 'undefined') return INITIAL_STARTER_ANNOUNCEMENTS;
  const existing = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
  if (!existing) {
    setItem(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_STARTER_ANNOUNCEMENTS);
    return INITIAL_STARTER_ANNOUNCEMENTS;
  }
  try {
    return JSON.parse(existing);
  } catch {
    return INITIAL_STARTER_ANNOUNCEMENTS;
  }
};

export const saveStoredAnnouncements = (announcements) => {
  setItem(STORAGE_KEYS.ANNOUNCEMENTS, announcements);
};

// Auth Session Management
export const getStoredAuthSession = () => {
  return getItem(STORAGE_KEYS.AUTH_SESSION, null);
};

export const setStoredAuthSession = (role, userProfile) => {
  setItem(STORAGE_KEYS.AUTH_SESSION, { role, userProfile, loginTime: new Date().toISOString() });
};

export const clearStoredAuthSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
  }
};

// Clear & Reset All System Data
export const resetAllPortalData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.PROPOSALS);
    localStorage.removeItem(STORAGE_KEYS.GALLERY);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
    localStorage.removeItem(STORAGE_KEYS.ANNOUNCEMENTS);
    localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
  }
};

