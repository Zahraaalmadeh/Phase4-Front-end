/* global process */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./db.js";

import inventoryRoutes from "./routes/inventoryStaffDB.routes.js";
import staffRoutes from "./routes/staffRoutes.js";
import requestRoutes from "./routes/requestsRoute.js";
import authRoutes from "./routes/authRoutes.js";
import staffReqRoutes from "./routes/staffReqRoute.js";
import adminRoutes from "./routes/adminRoutes.js";

import supplierRoutes from "./routes/supplierRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/inventoryStaffDB", inventoryRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/requests", requestRoutes);
app.use("/api/requests/my", staffReqRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/suppliers", supplierRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    const connected = await connectDB();

    if (!connected) {
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();