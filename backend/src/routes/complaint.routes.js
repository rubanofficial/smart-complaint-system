import express from "express";
import {
    createComplaint,
    getComplaintById,
    getAllComplaints,
    updateComplaintStatus,
} from "../controllers/complaint.controller.js";

const router = express.Router();

router.post("/", createComplaint);
router.get("/", getAllComplaints);
router.get("/:complaintId", getComplaintById);
router.put("/:complaintId", updateComplaintStatus);

export default router;
