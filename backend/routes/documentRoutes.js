import express from "express";
import {
    uploadDocument,
    getSupplierDocuments,
    deleteDocument,
    verifyDocument
} from "../models/SupplierManager.js";

const router = express.Router();

router.post("/:supplierId", async (req, res) => {
    try {
        const result = await uploadDocument(req.params.supplierId, req.body);
        res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/supplier/:supplierId", async (req, res) => {
    try {
        const result = await getSupplierDocuments(
            req.params.supplierId,
            req.query.documentType
        );

        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put("/:documentId/verify", async (req, res) => {
    try {
        const result = await verifyDocument(
            req.params.documentId,
            req.body.isVerified
        );

        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete("/:documentId", async (req, res) => {
    try {
        const result = await deleteDocument(req.params.documentId);
        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;