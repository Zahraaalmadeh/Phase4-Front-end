import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
    {
        documentId: {
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
        documentType: {
            type: String,
            enum: ["license", "certificate", "invoice", "report", "contract", "other"],
            required: true
        },
        fileName: {
            type: String,
            required: true,
            trim: true
        },
        fileSize: {
            type: Number,
            min: 0
        },
        filePath: {
            type: String,
            required: true
        },
        uploadDate: {
            type: Date,
            default: Date.now
        },
        description: {
            type: String,
            trim: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        expiryDate: {
            type: Date
        }
    },
    { timestamps: true }
);

// Keep only necessary indexes
documentSchema.index({ supplierId: 1 });
documentSchema.index({ documentType: 1 });

export default mongoose.model("SupplierDocument", documentSchema);