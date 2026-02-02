const API_BASE = "http://localhost:5000/api/complaints";

export const complaintService = {
  // Submit complaint
  async submitComplaint(data) {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to submit complaint");
    }

    return res.json();
  },

  // Track complaint by ID
  async trackComplaint(complaintId) {
    const res = await fetch(`${API_BASE}/${complaintId}`);

    if (!res.ok) {
      return null;
    }

    return res.json();
  },

  // Admin: get all complaints
  async getAllComplaints(query = "") {
    const res = await fetch(`${API_BASE}${query}`);

    if (!res.ok) {
      throw new Error("Failed to fetch complaints");
    }

    return res.json();
  },

  // Admin: get single complaint
  async getComplaint(complaintId) {
    const res = await fetch(`${API_BASE}/${complaintId}`);

    if (!res.ok) return null;

    return res.json();
  },

  // Admin: update status
  async updateComplaintStatus(complaintId, payload) {
    const res = await fetch(`${API_BASE}/${complaintId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to update complaint");
    }

    return res.json();
  },
};
