import mongoose from "mongoose";

const alertSettingsSchema = new mongoose.Schema(
  {
    lowStockThreshold: { type: Number, default: 10, min: 0 },
    expiryWarningDays: { type: Number, default: 30, min: 1 },
    criticalAlertEmail: { type: String, default: "" },
    alertFrequency: { type: String, enum: ["Immediately", "Every Hour", "Daily", "Weekly"], default: "Immediately" },
    emailAlertsEnabled: { type: Boolean, default: false },
    dashboardAlertsEnabled: { type: Boolean, default: true },
    smsAlertsEnabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const AlertSettingsModel = mongoose.model("AlertSettings", alertSettingsSchema);