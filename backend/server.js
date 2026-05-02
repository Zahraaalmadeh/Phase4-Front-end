import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./db.js";
import inventoryRoutes from "./routes/inventoryStaffDB.routes.js";
import staffRoutes from "./routes/staffRoutes.js";
import requestRoutes from "./routes/requestsRoute.js";
<<<<<<< Updated upstream
import supplierRoutes from "./routes/supplierRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
=======
import authRoutes from "./routes/authRoutes.js";
import staffReqRoutes from "./routes/staffReqRoute.js";
// import SupplierRoutes from "./routes/supplierRoutes.js";
// import AvailabilityRoutes from "./routes/availabilityRoutes.js";
// import DeliveryRoutes from "./routes/deliveryRoutes.js";
// import DocumentRoutes from "./routes/documentRoutes.js";
// import MessageRoutes from "./routes/messageRoutes.js";
>>>>>>> Stashed changes

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

let dbConnected = false;
connectDB().then(() => {
  dbConnected = true;
}).catch((err) => {
  console.warn("DB not available, running in fallback mode");
});

app.use("/inventoryStaffDB", inventoryRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/auth", authRoutes);
<<<<<<< Updated upstream
app.use("/api/suppliers", supplierRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/messages", messageRoutes);

=======
// app.use("/api/suppliers", SupplierRoutes);
// app.use("/api/availability", AvailabilityRoutes);
// app.use("/api/delivery", DeliveryRoutes);
// app.use("/api/documents", DocumentRoutes);
// app.use("/api/messages", MessageRoutes);
app.use("/api/requests/my", staffReqRoutes);
>>>>>>> Stashed changes
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});