import express from "express";
import {
    getAllSuppliers,
    getSupplierById,
    getSupplierByEmail,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    searchSuppliers,
    getSupplierRating,
    updateSupplierRating
} from "../models/SupplierManager.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const filters = {
            city: req.query.city,
            country: req.query.country,
            product: req.query.product,
            minRating: req.query.minRating
        };

        const result = await getAllSuppliers(filters);
        res.status(result.success ? 200 : 500).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/search", async (req, res) => {
    try {
        const result = await searchSuppliers(req.query.term);
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/email/:email", async (req, res) => {
    try {
        const result = await getSupplierByEmail(req.params.email);
        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/:id/rating", async (req, res) => {
    try {
        const result = await getSupplierRating(req.params.id);
        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put("/:id/rating", async (req, res) => {
    try {
        const result = await updateSupplierRating(req.params.id, req.body.newRating);
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const result = await getSupplierById(req.params.id);
        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const result = await createSupplier(req.body);
        res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const result = await updateSupplier(req.params.id, req.body);
        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await deleteSupplier(req.params.id);
        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;