/* global process */

import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import Supplier from "./models/SupplierData.js";

dotenv.config();

const suppliers = [
    {
        supplierId: "supplier_1001",
        companyName: "Green Materials Co",
        contactPerson: "Ahmed Ali",
        email: "supplier1001@example.com",
        password: "supplier_1001",
        phone: "+966501234567",
        address: "King Road",
        city: "Riyadh",
        country: "Saudi Arabia",
        products: ["cement", "steel"],
        rating: 4.5,
        isActive: true,
    },

    {
        supplierId: "supplier_1002",
        companyName: "Smart Build Supplies",
        contactPerson: "Sara Mohammed",
        email: "supplier1002@example.com",
        password: "supplier_1002",
        phone: "+966502222222",
        address: "Olaya Street",
        city: "Riyadh",
        country: "Saudi Arabia",
        products: ["wood", "glass", "tiles"],
        rating: 4.2,
        isActive: true,
    },

    {
        supplierId: "supplier_1003",
        companyName: "Eco Build Co",
        contactPerson: "Fahad Ali",
        email: "supplier1003@example.com",
        password: "supplier_1003",
        phone: "+966503333333",
        address: "Dammam Street",
        city: "Dammam",
        country: "Saudi Arabia",
        products: ["tools", "wood"],
        rating: 4.3,
        isActive: true,
    },

    {
        supplierId: "supplier_1004",
        companyName: "Royal Steel Industries",
        contactPerson: "Khalid Hassan",
        email: "supplier1004@example.com",
        password: "supplier_1004",
        phone: "+966504444444",
        address: "Industrial Area",
        city: "Jeddah",
        country: "Saudi Arabia",
        products: ["steel", "iron"],
        rating: 4.7,
        isActive: true,
    },

    {
        supplierId: "supplier_1005",
        companyName: "Future Wood Factory",
        contactPerson: "Noura Salem",
        email: "supplier1005@example.com",
        password: "supplier_1005",
        phone: "+966505555555",
        address: "Palm Avenue",
        city: "Khobar",
        country: "Saudi Arabia",
        products: ["wood", "doors"],
        rating: 4.1,
        isActive: true,
    },
];

const seedSuppliers = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URL ||
            process.env.MONGODB_URL ||
            process.env.MONGO_URI
        );

        console.log("MongoDB connected");

        await Supplier.deleteMany({});

        const hashedSuppliers = await Promise.all(
            suppliers.map(async (supplier) => ({
                ...supplier,
                password: await bcrypt.hash(supplier.password, 10),
            }))
        );

        await Supplier.insertMany(hashedSuppliers);

        console.log("Suppliers inserted successfully");

        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exit(1);
    }
};

seedSuppliers();