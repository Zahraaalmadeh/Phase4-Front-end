import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    messageId: {
        type: String,
        required: true,
        unique: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    senderRole: {
        type: String,
        enum: ['supplier', 'customer', 'admin'],
        required: true
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    messageContent: {
        type: String,
        required: true
    },
    attachments: [String],
    isRead: {
        type: Boolean,
        default: false
    },
    readAt: Date,
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
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

messageSchema.index({ supplierId: 1 });
messageSchema.index({ recipientId: 1 });
messageSchema.index({ isRead: 1 });

export default mongoose.model('SupplierMessage', messageSchema);