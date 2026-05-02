import express from "express";
import { RequestModel } from "../models/requests.js";
import e from "express";
import mongoose from "mongoose";


const router = express.Router();
router.get("/my/:staffId", async (req, res) => {
  try {
    const requests = await RequestModel.find({
      staffId: req.params.staffId
    });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;