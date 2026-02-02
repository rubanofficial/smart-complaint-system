import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
    {
        complaintId: { type: String, required: true, unique: true },

        isAnonymous: { type: Boolean, default: true },

        identity: {
            fullName: String,
            rollNumber: String,
            department: String,
        },

        category: {
            type: String,
            required: true,
            enum: [
                "academic",
                "hostel",
                "infrastructure",
                "safety",
                "harassment",
                "financial",
                "transport",
                "library",
                "other",
            ],
        },

        complaintText: { type: String, required: true },

        status: {
            type: String,
            default: "submitted",
            enum: ["submitted", "in_review", "resolved", "rejected"],
        },
    },
    { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
