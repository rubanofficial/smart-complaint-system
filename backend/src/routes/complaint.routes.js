import express from "express";
import {
    createComplaint,
    getComplaintById,
    getAllComplaints,
    updateComplaintStatus,
    getAnalytics,
} from "../controllers/complaint.controller.js";

const router = express.Router();

router.post("/", createComplaint);
router.get("/analytics", getAnalytics);
router.get("/", getAllComplaints);
router.get("/:complaintId", getComplaintById);
router.put("/:complaintId", updateComplaintStatus);

export default router;
