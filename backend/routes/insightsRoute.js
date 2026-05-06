import express from "express";
import { InventoryModel } from "../models/inventoryStaffDB.js";

const router = express.Router();

router.get("/insights", async (req, res) => {
    try {
        const data = await InventoryModel.find();

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
});

export default router;