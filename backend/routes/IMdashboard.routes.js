import express from "express";
import { InventoryManagerItem } from "../models/InventoryManagerItem.js";

const router = express.Router();

function getItemStatus(item) {
  const today = new Date();
  const expiry = new Date(item.expiryDate);
  const daysDifference = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

  if (Number(item.quantity) === 0) return "Out of Stock";
  if (expiry < today) return "Expired";
  if (daysDifference <= 30) return "Near Expiry";
  if (Number(item.quantity) <= Number(item.lowStockThreshold || 5)) return "Low Stock";

  return "Valid";
}

router.get("/summary", async (req, res) => {
  try {
    const items = await InventoryManagerItem.find({ removed: false });

    const summary = {
      lowStock: items.filter((item) => getItemStatus(item) === "Low Stock").length,
      expired: items.filter((item) => getItemStatus(item) === "Expired").length,
      nearExpiry: items.filter((item) => getItemStatus(item) === "Near Expiry").length,
      outOfStock: items.filter((item) => getItemStatus(item) === "Out of Stock").length,
      totalItems: items.length,
    };

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard summary." });
  }
});

export default router;