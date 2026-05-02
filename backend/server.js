import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./db.js";
import inventoryRoutes from "./routes/inventoryStaffDB.routes.js";
import staffRoutes from "./routes/staffRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import requestRoutes from "./routes/requestsRoute.js";
import SupplierRoutes from "./routes/supplierRoutes.js";
import AvailabilityRoutes from "./routes/availabilityRoutes.js";
import DeliveryRoutes from "./routes/deliveryRoutes.js";
import DocumentRoutes from "./routes/documentRoutes.js";
import MessageRoutes from "./routes/messageRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/inventoryStaffDB", inventoryRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/suppliers", SupplierRoutes);
app.use("/api/availability", AvailabilityRoutes);
app.use("/api/delivery", DeliveryRoutes);
app.use("/api/documents", DocumentRoutes);
app.use("/api/messages", MessageRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});