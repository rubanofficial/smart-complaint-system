import Complaint from "../models/Complaint.model.js";

// CREATE complaint (public)
export const createComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.create({
            ...req.body,
            status: "submitted",
        });

        res.status(201).json({
            success: true,
            complaintId: complaint.complaintId,
        });
    } catch (error) {
        console.error("Create complaint error:", error);
        res.status(500).json({ message: "Failed to submit complaint" });
    }
};

// GET complaint by ID (public tracking)
export const getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findOne({
            complaintId: req.params.complaintId,
        });

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        res.json({
            complaintId: complaint.complaintId,
            status: complaint.status,
            lastUpdated: complaint.updatedAt,
            adminRemarks: complaint.adminRemarks,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching complaint" });
    }
};

// ✅ GET ALL complaints (ADMIN)
export const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 });
        res.json({ complaints });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch complaints" });
    }
};

// UPDATE complaint status (ADMIN)
export const updateComplaintStatus = async (req, res) => {
    try {
        const { status, adminRemarks } = req.body;

        const complaint = await Complaint.findOneAndUpdate(
            { complaintId: req.params.complaintId },
            {
                status,
                adminRemarks,
                updatedAt: new Date(),
            },
            { new: true }
        );

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: "Failed to update complaint" });
    }
};
