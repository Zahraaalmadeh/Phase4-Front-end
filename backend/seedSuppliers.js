/* global process */

import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Supplier from "./models/SupplierData.js";

dotenv.config();

const suppliers = [
    {
        supplierId: "SUP001",
        companyName: "Green Materials Co",
        contactPerson: "Ahmed Ali",
        email: "supplier1@example.com",
        password: "1234@",
        phone: "+966501234567",
        address: "King Road",
        city: "Riyadh",
        country: "Saudi Arabia",
        products: ["cement", "steel"],
        rating: 4.5,
        isActive: true
    },
    {
        supplierId: "SUP002",
        companyName: "Smart Build Supplies",
        contactPerson: "Sara Mohammed",
        email: "supplier2@example.com",
        password: "9817@",
        phone: "+966502222222",
        address: "Olaya Street",
        city: "Riyadh",
        country: "Saudi Arabia",
        products: ["wood", "glass", "tiles"],
        rating: 4.2,
        isActive: true
    }
];

const seedSuppliers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected");

        await Supplier.deleteMany({});

        const hashedSuppliers = await Promise.all(
            suppliers.map(async (supplier) => ({
                ...supplier,
                password: await bcrypt.hash(supplier.password, 10)
            }))
        );

        await Supplier.insertMany(hashedSuppliers);

        console.log("Fake suppliers inserted successfully");
        process.exit();
    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exit(1);
    }
};

seedSuppliers();