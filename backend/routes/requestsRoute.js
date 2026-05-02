import express from "express";
import { RequestModel } from "../models/requests.js";

const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const newRequest = await RequestModel.create(req.body);
    res.status(201).json(newRequest);
  }   catch (err) {
    console.log("🔥 ERROR MESSAGE:", err.message);
    console.log("🔥 FULL ERROR:", err);
    console.log("🔥 STACK:", err.stack);

    res.status(500).json({ error: err.message });
  }
});
router.get("/", async (req, res) => {
  const data = await RequestModel.find();
  res.json(data);
});

//changes 
router.put("/:id/status", async (req, res) => {
  try {
    const { status, reason } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be either approved or rejected.",
      });
    }

    if (status === "rejected" && (!reason || reason.trim() === "")) {
      return res.status(400).json({
        message: "Rejection reason is required.",
      });
    }

    const updatedRequest = await RequestModel.findByIdAndUpdate(
      req.params.id,
      {
        status,
        reason: status === "rejected" ? reason : "",
      },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found." });
    }

    res.status(200).json({
      message: `Request ${status} successfully.`,
      request: updatedRequest,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update request status.",
      error: err.message,
    });
  }
});



export default router;
