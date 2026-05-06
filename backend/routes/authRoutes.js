import express from "express";
import bcrypt from "bcryptjs";

import { StaffModel } from "../models/StaffData.js";
import Supplier from "../models/SupplierData.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const loginValue = username?.trim();

    if (!loginValue || !password) {
      return res.status(400).json({ message: "Username/email and password are required" });
    }

    const staff = await StaffModel.findOne({
      $or: [{ username: loginValue }, { email: loginValue.toLowerCase() }],
      isActive: true,
    });

    if (staff) {
      if (staff.password !== password) {
        return res.status(401).json({ message: "Wrong password" });
      }

      return res.json({
        _id: staff._id,
        staffId: staff.staffId,
        name: staff.name,
        email: staff.email,
        department: staff.department,
        role: staff.role,
      });
    }

    const supplier = await Supplier.findOne({
      isActive: true,
      $or: [
        { supplierId: loginValue.toUpperCase() },
        { email: loginValue.toLowerCase() },
      ],
    });

    if (!supplier) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, supplier.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Wrong password" });
    }

    return res.json({
      _id: supplier._id,
      supplierId: supplier.supplierId,
      name: supplier.companyName,
      companyName: supplier.companyName,
      email: supplier.email,
      role: "supplier",
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server crashed" });
  }
});

export default router;