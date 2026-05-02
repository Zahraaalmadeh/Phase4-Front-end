import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    action: { type: String, required: true },
    module: { type: String, required: true },
  },
  { timestamps: true }
);

export const ActivityLogModel = mongoose.model("ActivityLog", activityLogSchema);