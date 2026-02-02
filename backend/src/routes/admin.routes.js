import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/dashboard", protect, (req, res) => {
    res.json({ message: "Admin dashboard data" });
});

router.get("/complaints", protect, allowRoles("admin", "staff"), (req, res) => {
    res.json({ message: "List of complaints" });
});

export default router;
