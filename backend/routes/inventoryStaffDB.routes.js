import express from "express";
import { InventoryModel } from "../models/inventoryStaffDB.js";

const router = express.Router();



router.get("/", async (req, res) => {
  try {
    const items = await InventoryModel.find();

    res.json(
      items.map(item => ({
        id: item.id,        
        name: item.name,
        stock: item.stock,
        expiry: item.expiry,
        dept: item.dept,
        icon: item.icon,
        note: item.note
      }))
    );

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



export default router;