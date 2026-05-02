import express from "express";
import {
    createSupplierRequest,
    getSupplierRequests,
    updateRequestStatus
} from "../models/SupplierManager.js";
import { validateRequest } from "../middleware/validation.js";
const router = express.Router();


// CREATE delivery/request estimate
router.post("/estimate/:supplierId", validateRequest, async (req, res) => {
    try {
        const requestData = {
            ...req.body,
            supplierId: req.params.supplierId
        };

        const result = await createSupplierRequest(requestData);

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
        const filters = {
            status: req.query.status,
            dateFrom: req.query.dateFrom
        };

        const result = await getSupplierRequests(req.params.supplierId, filters);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


router.put("/:requestId/status", async (req, res) => {
    try {
        const result = await updateRequestStatus(req.params.requestId, req.body.newStatus);

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