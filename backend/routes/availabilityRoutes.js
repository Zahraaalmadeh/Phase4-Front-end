import express from "express";
import {
    setSupplierAvailability,
    getSupplierAvailability,
    checkSupplierAvailability
} from "../models/SupplierManager.js";

const router = express.Router();

router.post("/:supplierId", async (req, res) => {
    try {
        const result = await setSupplierAvailability(req.params.supplierId, req.body);
        res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/:supplierId/check", async (req, res) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({
                success: false,
                message: "Date is required"
            });
        }

        const result = await checkSupplierAvailability(req.params.supplierId, date);
        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/:supplierId", async (req, res) => {
    try {
        const result = await getSupplierAvailability(req.params.supplierId);
        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put("/:supplierId", async (req, res) => {
    try {
        const result = await setSupplierAvailability(req.params.supplierId, req.body);
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;