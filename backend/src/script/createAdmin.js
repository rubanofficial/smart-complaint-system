import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.model.js";

dotenv.config(); // ✅ auto-loads backend/.env

async function createAdmin() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI not found. Check .env file");
        }

        await mongoose.connect(process.env.MONGO_URI);

        const existing = await Admin.findOne({ email: "admin@intuition.com" });
        if (existing) {
            console.log("⚠️ Admin already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        await Admin.create({
            name: "Super Admin",
            email: "admin@intuition.com",
            password: hashedPassword,
            role: "admin",
        });

        console.log("✅ Admin created successfully");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error creating admin:", err);
        process.exit(1);
    }
}

createAdmin();
