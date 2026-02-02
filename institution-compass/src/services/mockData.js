const categories = [
  "academic",
  "administrative",
  "infrastructure",
  "harassment",
  "safety",
  "financial",
  "hostel",
  "library",
  "transport",
  "other",
];

const statuses = ["submitted", "in_review", "resolved", "rejected"];
const priorities = ["low", "medium", "high", "critical"];

const departments = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Business Administration",
  "Arts & Humanities",
];

const sampleComplaints = [
  "The air conditioning is not working.",
  "Library resources are outdated.",
  "Safety hazard near parking area.",
  "Online portal frequently crashes.",
];

export function generateComplaintId() {
  return `GRV-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .substring(2, 6)
    .toUpperCase()}`;
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateMockComplaint(index) {
  const isAnonymous = Math.random() > 0.6;
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const priority = priorities[Math.floor(Math.random() * priorities.length)];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const createdDate = randomDate(new Date(2024, 0, 1), new Date());

  return {
    complaintId: generateComplaintId(),
    isAnonymous,
    identity: isAnonymous
      ? null
      : {
        fullName: `Student ${index + 1}`,
        rollNumber: `2024${index + 100}`,
        department:
          departments[Math.floor(Math.random() * departments.length)],
      },
    complaintText: sampleComplaints[index % sampleComplaints.length],
    category,
    files: [],
    mlOutput: {
      category,
      priority,
      sentiment: "negative",
      keywords: ["issue", "urgent"],
      flags: {
        urgent: priority === "high" || priority === "critical",
        safety: category === "safety",
        duplicate: false,
      },
      confidence: 0.8,
    },
    status,
    auditLog: [
      {
        timestamp: createdDate.toISOString(),
        action: "Complaint submitted",
        performedBy: "System",
      },
    ],
    createdAt: createdDate.toISOString(),
    updatedAt: createdDate.toISOString(),
  };
}

export const mockComplaints = Array.from({ length: 25 }, (_, i) =>
  generateMockComplaint(i)
);

export const mockAdmins = [
  { id: "1", name: "Dr. Admin User", email: "admin@university.edu", role: "admin" },
  { id: "2", name: "Staff Member", email: "staff@university.edu", role: "staff" },
];
