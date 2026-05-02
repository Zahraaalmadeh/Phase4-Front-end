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

router.post("/", async (req, res) => {
  try {
    const {
      name,
      quantity,
      productionDate,
      expiryDate,
      department,
      supplier,
      lowStockThreshold,
    } = req.body;

    if (!name || quantity === undefined || !productionDate || !expiryDate || !department || !supplier) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    if (Number(quantity) <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than 0." });
    }

    if (new Date(expiryDate) <= new Date(productionDate)) {
      return res.status(400).json({ message: "Expiration date must be after production date." });
    }

    const newItem = await InventoryManagerItem.create({
      name,
      quantity,
      productionDate,
      expiryDate,
      department,
      supplier,
      lowStockThreshold,
    });

    res.status(201).json({
      message: "Product added successfully.",
      item: newItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add inventory item" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { search, department, status } = req.query;

    const query = { removed: false };

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (department) {
      query.department = { $regex: department, $options: "i" };
    }

    let items = await InventoryManagerItem.find(query);

    if (status) {
      items = items.filter((item) => getItemStatus(item) === status);
    }

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inventory items." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, quantity, productionDate, expiryDate, department, supplier } = req.body;

    if (!name || quantity === undefined || !productionDate || !expiryDate || !department || !supplier) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    if (Number(quantity) <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than 0." });
    }

    if (new Date(expiryDate) <= new Date(productionDate)) {
      return res.status(400).json({ message: "Expiration date must be after production date." });
    }

    const updatedItem = await InventoryManagerItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Inventory item not found." });
    }

    res.status(200).json({
      message: "Changes saved successfully.",
      item: updatedItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update inventory item." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { removedReason } = req.body;

    const removedItem = await InventoryManagerItem.findByIdAndUpdate(
      req.params.id,
      {
        removed: true,
        removedReason: removedReason || "Removed by inventory manager",
      },
      { new: true }
    );

    if (!removedItem) {
      return res.status(404).json({ message: "Inventory item not found." });
    }

    res.status(200).json({
      message: "Item removed successfully.",
      item: removedItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove inventory item." });
  }
});

export default router;