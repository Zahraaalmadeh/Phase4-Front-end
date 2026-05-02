import express from "express";
import {
    sendMessage,
    getSupplierMessages,
    markMessageAsRead,
    getUnreadMessages
} from "../models/SupplierManager.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const result = await sendMessage(req.body);
        res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/:supplierId/unread/:recipientId", async (req, res) => {
    try {
        const result = await getUnreadMessages(
            req.params.recipientId,
            req.params.supplierId
        );

        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put("/:messageId/read", async (req, res) => {
    try {
        const result = await markMessageAsRead(req.params.messageId);
        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/:supplierId/:userId", async (req, res) => {
    try {
        const result = await getSupplierMessages(
            req.params.supplierId,
            req.params.userId
        );

        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;