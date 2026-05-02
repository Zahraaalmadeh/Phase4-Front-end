import express from "express";
import {
    uploadDocument,
    getSupplierDocuments,
    deleteDocument,
    verifyDocument
} from "../models/SupplierManager.js";
import { validateDocument } from "../middleware/validation.js";
const router = express.Router();

// UPLOAD document
router.post("/:supplierId", validateDocument, async (req, res) => {
    try {
        const result = await uploadDocument(req.params.supplierId, req.body);

        if (result.success) {
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/:supplierId", async (req, res) => {
    try {
        const result = await getSupplierDocuments(req.params.supplierId, req.query.documentType);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


router.delete("/:documentId", async (req, res) => {
    try {
        const result = await deleteDocument(req.params.documentId);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put("/:documentId/verify", async (req, res) => {
    try {
        const result = await verifyDocument(req.params.documentId, req.body.isVerified);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;