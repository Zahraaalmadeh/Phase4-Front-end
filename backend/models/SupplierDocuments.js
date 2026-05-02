import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    documentId: {
        type: String,
        required: true,
        unique: true
    },
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    documentType: {
        type: String,
        enum: ['license', 'certificate', 'invoice', 'report', 'contract', 'other'],
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    fileSize: Number,
    filePath: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    description: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    expiryDate: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

documentSchema.index({ supplierId: 1 });
documentSchema.index({ documentType: 1 });

export default mongoose.model('SupplierDocument', documentSchema);