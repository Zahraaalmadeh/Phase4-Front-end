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
import { validateSupplier } from "backend/middleware/validation.js";

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

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const result = await getSupplierById(req.params.id);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


router.get("/email/:email", async (req, res) => {
    try {
        const result = await getSupplierByEmail(req.params.email);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


router.get("/search/query/:searchTerm", async (req, res) => {
    try {
        const result = await searchSuppliers(req.params.searchTerm);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});



router.post("/", validateSupplier, async (req, res) => {
    try {
        const result = await createSupplier(req.body);

        if (result.success) {
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const result = await updateSupplier(req.params.id, req.body);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const result = await deleteSupplier(req.params.id);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


router.get("/:id/rating", async (req, res) => {
    try {
        const result = await getSupplierRating(req.params.id);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put("/:id/rating", async (req, res) => {
    try {
        const result = await updateSupplierRating(req.params.id, req.body.newRating);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;