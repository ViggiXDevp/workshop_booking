// mockData.js
// Mirrors the Django models: WorkshopType, Workshop, Profile, User, Comment
// Used by the React frontend to simulate API responses from the Django backend.

// ── Workshop Types (WorkshopType model) ──────────────────────────────────────
export const workshopTypes = [
  {
    id: 1,
    name: "Python",
    duration: 2,
    description:
      "An introductory Python workshop covering data types, control flow, functions, and file handling. Ideal for students with no prior programming experience.",
    terms_and_conditions:
      "The coordinator must ensure a minimum of 30 participants. A computer lab with internet access is mandatory. The workshop must be conducted within the FOSSEE-approved syllabus.",
  },
  {
    id: 2,
    name: "Scilab",
    duration: 2,
    description:
      "Learn numerical computation and simulation using Scilab. Topics include matrix operations, plotting, and solving engineering problems.",
    terms_and_conditions:
      "Participants must have Scilab installed before the workshop. The coordinator is responsible for hardware compatibility checks.",
  },
  {
    id: 3,
    name: "OpenFOAM",
    duration: 3,
    description:
      "A hands-on workshop on Computational Fluid Dynamics (CFD) using OpenFOAM. Covers meshing, solver setup, and post-processing.",
    terms_and_conditions:
      "Requires Linux environment. Participants should be familiar with basic fluid mechanics. Minimum batch size: 20.",
  },
  {
    id: 4,
    name: "DWSIM",
    duration: 2,
    description:
      "Process simulation using DWSIM. Learn steady-state simulation of chemical processes, thermodynamic property estimation, and flowsheet creation.",
    terms_and_conditions:
      "Participants must have basic knowledge of chemical engineering. DWSIM software must be pre-installed.",
  },
  {
    id: 5,
    name: "eSim",
    duration: 2,
    description:
      "Electronic circuit simulation using eSim, a free and open-source EDA tool. Topics include schematic design, SPICE simulation, and PCB layout.",
    terms_and_conditions:
      "A laptop with eSim installed is required. Prior knowledge of basic electronics is recommended.",
  },
  {
    id: 6,
    name: "Osdag",
    duration: 2,
    description:
      "Steel structure design using Osdag software, developed under FOSSEE, IIT Bombay. Covers connection design as per IS standards.",
    terms_and_conditions:
      "Participants must be from civil or structural engineering background. Minimum 15 participants required.",
  },
];

// ── Indian States (matches model choices) ────────────────────────────────────
export const stateChoices = [
  { code: "IN-AP", name: "Andhra Pradesh" },
  { code: "IN-BR", name: "Bihar" },
  { code: "IN-DL", name: "Delhi" },
  { code: "IN-GJ", name: "Gujarat" },
  { code: "IN-KA", name: "Karnataka" },
  { code: "IN-KL", name: "Kerala" },
  { code: "IN-MH", name: "Maharashtra" },
  { code: "IN-MP", name: "Madhya Pradesh" },
  { code: "IN-PB", name: "Punjab" },
  { code: "IN-RJ", name: "Rajasthan" },
  { code: "IN-TN", name: "Tamil Nadu" },
  { code: "IN-TG", name: "Telangana" },
  { code: "IN-UP", name: "Uttar Pradesh" },
  { code: "IN-WB", name: "West Bengal" },
];

// ── Workshops (Workshop model with status: 0=Pending, 1=Accepted, 2=Deleted) ─
export const workshops = [
  {
    id: 1,
    workshop_type: { id: 1, name: "Python" },
    coordinator: {
      id: 10,
      full_name: "Aisha Sharma",
      email: "aisha@example.com",
      profile: { institute: "IIT Bombay", state: "IN-MH", phone: "9876543210" },
    },
    instructor: { id: 20, full_name: "Dr. Rahul Mehta" },
    date: "2025-03-15",
    status: 1,
    tnc_accepted: true,
  },
  {
    id: 2,
    workshop_type: { id: 2, name: "Scilab" },
    coordinator: {
      id: 11,
      full_name: "Rohan Kulkarni",
      email: "rohan@example.com",
      profile: { institute: "VJTI Mumbai", state: "IN-MH", phone: "9823456710" },
    },
    instructor: { id: 21, full_name: "Prof. Sneha Joshi" },
    date: "2025-04-02",
    status: 1,
    tnc_accepted: true,
  },
  {
    id: 3,
    workshop_type: { id: 1, name: "Python" },
    coordinator: {
      id: 12,
      full_name: "Priya Nair",
      email: "priya@example.com",
      profile: { institute: "NIT Calicut", state: "IN-KL", phone: "9745632180" },
    },
    instructor: null,
    date: "2025-05-10",
    status: 0,
    tnc_accepted: true,
  },
  {
    id: 4,
    workshop_type: { id: 3, name: "OpenFOAM" },
    coordinator: {
      id: 13,
      full_name: "Aarav Patel",
      email: "aarav@example.com",
      profile: { institute: "IIT Gandhinagar", state: "IN-GJ", phone: "9654321780" },
    },
    instructor: { id: 22, full_name: "Dr. Kiran Desai" },
    date: "2025-04-20",
    status: 1,
    tnc_accepted: true,
  },
  {
    id: 5,
    workshop_type: { id: 4, name: "DWSIM" },
    coordinator: {
      id: 14,
      full_name: "Meera Reddy",
      email: "meera@example.com",
      profile: { institute: "Osmania University", state: "IN-TG", phone: "9532167890" },
    },
    instructor: { id: 23, full_name: "Prof. Venkat Rao" },
    date: "2025-03-28",
    status: 1,
    tnc_accepted: true,
  },
  {
    id: 6,
    workshop_type: { id: 5, name: "eSim" },
    coordinator: {
      id: 15,
      full_name: "Siddharth Kumar",
      email: "sid@example.com",
      profile: { institute: "IIT Kanpur", state: "IN-UP", phone: "9412345678" },
    },
    instructor: null,
    date: "2025-06-05",
    status: 0,
    tnc_accepted: true,
  },
  {
    id: 7,
    workshop_type: { id: 1, name: "Python" },
    coordinator: {
      id: 16,
      full_name: "Divya Singh",
      email: "divya@example.com",
      profile: { institute: "BHU Varanasi", state: "IN-UP", phone: "9876012345" },
    },
    instructor: { id: 24, full_name: "Dr. Amit Tiwari" },
    date: "2025-04-12",
    status: 1,
    tnc_accepted: true,
  },
  {
    id: 8,
    workshop_type: { id: 6, name: "Osdag" },
    coordinator: {
      id: 17,
      full_name: "Nikhil Rao",
      email: "nikhil@example.com",
      profile: { institute: "COEP Pune", state: "IN-MH", phone: "9823012345" },
    },
    instructor: { id: 25, full_name: "Prof. Suresh Patil" },
    date: "2025-05-22",
    status: 1,
    tnc_accepted: true,
  },
];

// ── Current logged-in user (Coordinator) ─────────────────────────────────────
export const currentUser = {
  id: 10,
  username: "vighnesh_reddy",
  full_name: "Vighnesh Reddy",
  first_name: "Vighnesh",
  last_name: "Reddy",
  email: "vighnesh@example.com",
  is_instructor: false,
  profile: {
    title: "Ms.",
    institute: "VIT BHOPAL UNIVERSITY",
    department: "computer engineering",
    phone_number: "7989919165",
    position: "coordinator",
    location: "Bhopal",
    state: "IN-MP",
  },
};

// ── My Workshops (scoped to currentUser as coordinator) ──────────────────────
export const myWorkshops = workshops.filter(
  (w) => w.coordinator.id === currentUser.id
);

// ── Statistics aggregates ────────────────────────────────────────────────────
export function getStatsByState(data) {
  const map = {};
  data.forEach((w) => {
    const s = stateChoices.find((x) => x.code === w.coordinator.profile.state);
    const label = s ? s.name : w.coordinator.profile.state;
    map[label] = (map[label] || 0) + 1;
  });
  return { labels: Object.keys(map), counts: Object.values(map) };
}

export function getStatsByType(data) {
  const map = {};
  data.forEach((w) => {
    const name = w.workshop_type.name;
    map[name] = (map[name] || 0) + 1;
  });
  return { labels: Object.keys(map), counts: Object.values(map) };
}

// ── Department choices (matching Django model) ────────────────────────────────
export const departmentChoices = [
  { value: "computer engineering", label: "Computer Science" },
  { value: "information technology", label: "Information Technology" },
  { value: "civil engineering", label: "Civil Engineering" },
  { value: "electrical engineering", label: "Electrical Engineering" },
  { value: "mechanical engineering", label: "Mechanical Engineering" },
  { value: "chemical engineering", label: "Chemical Engineering" },
  { value: "electronics", label: "Electronics" },
];

export const titleChoices = [
  { value: "Professor", label: "Prof." },
  { value: "Doctor", label: "Dr." },
  { value: "Mr", label: "Mr." },
  { value: "Mrs", label: "Mrs." },
  { value: "Miss", label: "Ms." },
];
