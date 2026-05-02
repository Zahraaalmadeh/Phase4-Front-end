import express from "express";
import {
    uploadDocument,
    getSupplierDocuments,
    deleteDocument,
    verifyDocument
} from "../models/SupplierManager.js";

const router = express.Router();

// UPLOAD document
// POST /api/documents/:supplierId
// Body: { documentId, documentType, fileName, fileSize, filePath, description, expiryDate }
router.post("/:supplierId", async (req, res) => {
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

// GET supplier documents
// GET /api/documents/:supplierId?documentType=license
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

// DELETE document
// DELETE /api/documents/:documentId
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

// VERIFY document
// PUT /api/documents/:documentId/verify
// Body: { isVerified: true/false }
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