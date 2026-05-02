import express from "express";
import { StaffModel } from "../models/StaffData.js";
import { CategoryModel } from "../models/Category.js";
import { NotificationModel } from "../models/Notification.js";
import { AlertSettingsModel } from "../models/AlertSettings.js";
import { ActivityLogModel } from "../models/ActivityLog.js";

const router = express.Router();

// Helper: automatically log every admin action
async function logAction(user, action, module) {
  try {
    await ActivityLogModel.create({ user, action, module });
  } catch (_) {}
}

// ── USERS ──────────────────────────────────────────────

// GET all users
router.get("/users", async (req, res) => {
  try {
    const users = await StaffModel.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
});

// POST create user
router.post("/users", async (req, res) => {
  try {
    const { name, email, username, password, role, phone, isActive, department } = req.body;

    if (!name || !email || !username || !password || !role) {
      return res.status(400).json({ message: "Name, email, username, password, and role are required." });
    }

    const exists = await StaffModel.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(409).json({ message: "A user with that email or username already exists." });

    const user = await StaffModel.create({ name, email, username, password, role, phone, isActive, department });
    await logAction("Admin", `Added new user: ${name}`, "Users");
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Failed to create user", error: err.message });
  }
});

// PUT update user
router.put("/users/:id", async (req, res) => {
  try {
    const { name, email, username, password, role, phone, isActive, department } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ message: "Name, email, and role are required." });
    }

    const updateData = { name, email, username, role, phone, isActive, department };
    if (password && password.trim() !== "") updateData.password = password;

    const user = await StaffModel.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    await logAction("Admin", `Updated user: ${name}`, "Users");
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Failed to update user", error: err.message });
  }
});

// DELETE user
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await StaffModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await logAction("Admin", `Deleted user: ${user.name}`, "Users");
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", error: err.message });
  }
});

//  CATEGORIES 

router.get("/categories", async (req, res) => {
  try {
    const categories = await CategoryModel.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories", error: err.message });
  }
});

router.post("/categories", async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: "Category name is required." });

    const exists = await CategoryModel.findOne({ name: name.trim() });
    if (exists) return res.status(409).json({ message: "Category already exists." });

    const category = await CategoryModel.create({ name: name.trim(), description });
    await logAction("Admin", `Added category: ${name}`, "Categories");
    res.status(201).json({ message: "Category created", category });
  } catch (err) {
    res.status(500).json({ message: "Failed to create category", error: err.message });
  }
});

router.put("/categories/:id", async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: "Category name is required." });

    const category = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      { name: name.trim(), description, isActive },
      { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ message: "Category not found" });

    await logAction("Admin", `Updated category: ${name}`, "Categories");
    res.json({ message: "Category updated", category });
  } catch (err) {
    res.status(500).json({ message: "Failed to update category", error: err.message });
  }
});

router.delete("/categories/:id", async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    await logAction("Admin", `Deleted category: ${category.name}`, "Categories");
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete category", error: err.message });
  }
});

//  NOTIFICATIONS 

router.get("/notifications", async (req, res) => {
  try {
    const notifications = await NotificationModel.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notifications", error: err.message });
  }
});

router.post("/notifications", async (req, res) => {
  try {
    const { title, type, message, targetRole } = req.body;
    if (!title || !type) return res.status(400).json({ message: "Title and type are required." });

    const notification = await NotificationModel.create({ title, type, message, targetRole });
    await logAction("Admin", `Created notification: ${title}`, "Notifications");
    res.status(201).json({ message: "Notification created", notification });
  } catch (err) {
    res.status(500).json({ message: "Failed to create notification", error: err.message });
  }
});

router.put("/notifications/:id", async (req, res) => {
  try {
    const { title, type, message, targetRole, isActive } = req.body;
    if (!title || !type) return res.status(400).json({ message: "Title and type are required." });

    const notification = await NotificationModel.findByIdAndUpdate(
      req.params.id,
      { title, type, message, targetRole, isActive },
      { new: true, runValidators: true }
    );
    if (!notification) return res.status(404).json({ message: "Notification not found" });

    await logAction("Admin", `Updated notification: ${title}`, "Notifications");
    res.json({ message: "Notification updated", notification });
  } catch (err) {
    res.status(500).json({ message: "Failed to update notification", error: err.message });
  }
});

router.delete("/notifications/:id", async (req, res) => {
  try {
    const notification = await NotificationModel.findByIdAndDelete(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found" });

    await logAction("Admin", `Deleted notification: ${notification.title}`, "Notifications");
    res.json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete notification", error: err.message });
  }
});

// ALERT SETTINGS 

router.get("/alerts", async (req, res) => {
  try {
    let settings = await AlertSettingsModel.findOne();
    if (!settings) {
      settings = { lowStockThreshold: 10, expiryWarningDays: 30, criticalAlertEmail: "", alertFrequency: "Immediately", emailAlertsEnabled: false, dashboardAlertsEnabled: true, smsAlertsEnabled: false };
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch alert settings", error: err.message });
  }
});

router.put("/alerts", async (req, res) => {
  try {
    const { lowStockThreshold, expiryWarningDays, criticalAlertEmail, alertFrequency, emailAlertsEnabled, dashboardAlertsEnabled, smsAlertsEnabled } = req.body;

    if (lowStockThreshold < 0) return res.status(400).json({ message: "Low stock threshold must be 0 or greater." });
    if (expiryWarningDays < 1) return res.status(400).json({ message: "Expiry warning days must be at least 1." });

    const settings = await AlertSettingsModel.findOneAndUpdate(
      {},
      { lowStockThreshold, expiryWarningDays, criticalAlertEmail, alertFrequency, emailAlertsEnabled, dashboardAlertsEnabled, smsAlertsEnabled },
      { new: true, upsert: true, runValidators: true }
    );

    await logAction("Admin", "Updated alert settings", "Alerts");
    res.json({ message: "Alert settings saved", settings });
  } catch (err) {
    res.status(500).json({ message: "Failed to save alert settings", error: err.message });
  }
});

// ACTIVITY LOGS 

router.get("/logs", async (req, res) => {
  try {
    const logs = await ActivityLogModel.find().sort({ createdAt: -1 }).limit(100);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch logs", error: err.message });
  }
});

// DASHBOARD STATS 

router.get("/stats", async (req, res) => {
  try {
    const [totalUsers, totalCategories, activeNotifications] = await Promise.all([
      StaffModel.countDocuments(),
      CategoryModel.countDocuments({ isActive: true }),
      NotificationModel.countDocuments({ isActive: true }),
    ]);
    res.json({ totalUsers, totalCategories, activeNotifications });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
});

export default router;