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

  // Admin: get dashboard metrics
  async getDashboardMetrics() {
    try {
      const response = await this.getAllComplaints();
      const complaints = Array.isArray(response) ? response : response.complaints || [];

      const statusBreakdown = {
        submitted: 0,
        in_review: 0,
        resolved: 0,
        rejected: 0,
      };

      let highPriorityCount = 0;
      let safetyRelatedCount = 0;
      let anonymousCount = 0;
      let identifiedCount = 0;

      complaints.forEach((complaint) => {
        // Count status breakdown
        if (statusBreakdown[complaint.status] !== undefined) {
          statusBreakdown[complaint.status]++;
        }

        // Count high priority
        if (complaint.mlOutput?.priority === "high" || complaint.mlOutput?.priority === "critical") {
          highPriorityCount++;
        }

        // Count safety related
        if (complaint.category === "safety") {
          safetyRelatedCount++;
        }

        // Count anonymous vs identified
        if (complaint.isAnonymous) {
          anonymousCount++;
        } else {
          identifiedCount++;
        }
      });

      return {
        totalComplaints: complaints.length,
        statusBreakdown,
        highPriorityCount,
        safetyRelatedCount,
        anonymousCount,
        identifiedCount,
      };
    } catch (e) {
      console.error("Failed to fetch dashboard metrics:", e);
      throw e;
    }
  },
};
