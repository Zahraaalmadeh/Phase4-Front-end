import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: ["Info", "Warning", "Alert"], required: true },
    message: { type: String, default: "" },
    targetRole: { type: String, enum: ["all", "staff", "manager", "supplier", "admin"], default: "all" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const NotificationModel = mongoose.model("Notification", notificationSchema);