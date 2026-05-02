import mongoose from "mongoose";

const supplierRequestSchema = new mongoose.Schema(
    {
        requestId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        supplierId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true
        },
        productName: {
            type: String,
            required: true,
            trim: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        requestedDate: {
            type: Date,
            required: true
        },
        dueDate: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected", "in-progress", "completed", "cancelled"],
            default: "pending"
        },
        description: {
            type: String,
            trim: true
        },
        budget: {
            type: Number,
            min: 0
        },
        attachments: {
            type: [String],
            default: []
        },
        notes: {
            type: String,
            trim: true
        }
    },
    { timestamps: true }
);

// Keep useful indexes
supplierRequestSchema.index({ supplierId: 1 });
supplierRequestSchema.index({ status: 1 });

export default mongoose.model("SupplierRequest", supplierRequestSchema);