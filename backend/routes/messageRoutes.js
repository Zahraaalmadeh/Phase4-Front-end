import express from "express";
import {
    sendMessage,
    getSupplierMessages,
    markMessageAsRead,
    getUnreadMessages
} from "../models/SupplierManager.js";
import { validateMessage } from "../middleware/validation.js";
const router = express.Router();


// SEND message
router.post("/", validateMessage, async (req, res) => {
    try {
        const result = await sendMessage(req.body);

        if (result.success) {
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/:supplierId/:recipientId", async (req, res) => {
    try {
        const result = await getSupplierMessages(req.params.supplierId, req.params.recipientId);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/:supplierId/unread/:recipientId", async (req, res) => {
    try {
        const result = await getUnreadMessages(req.params.recipientId, req.params.supplierId);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


router.put("/:messageId/read", async (req, res) => {
    try {
        const result = await markMessageAsRead(req.params.messageId);

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