import mongoose from "mongoose";

const supplierRequestSchema = new mongoose.Schema({
    requestId: {
        type: String,
        required: true,
        unique: true
    },
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    productName: {
        type: String,
        required: true
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
        enum: ['pending', 'accepted', 'rejected', 'in-progress', 'completed', 'cancelled'],
        default: 'pending'
    },
    description: String,
    budget: Number,
    attachments: [String],
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

supplierRequestSchema.index({ supplierId: 1 });
supplierRequestSchema.index({ status: 1 });

export default mongoose.model('SupplierRequest', supplierRequestSchema);