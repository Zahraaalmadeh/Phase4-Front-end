import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        messageId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        senderRole: {
            type: String,
            enum: ["supplier", "customer", "admin"],
            required: true
        },
        recipientId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        supplierId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true
        },
        subject: {
            type: String,
            required: true,
            trim: true
        },
        messageContent: {
            type: String,
            required: true,
            trim: true
        },
        attachments: {
            type: [String],
            default: []
        },
        isRead: {
            type: Boolean,
            default: false
        },
        readAt: {
            type: Date
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        }
    },
    { timestamps: true }
);

messageSchema.index({ supplierId: 1 });
messageSchema.index({ recipientId: 1 });
messageSchema.index({ senderId: 1 });
messageSchema.index({ isRead: 1 });

export default mongoose.model("SupplierMessage", messageSchema);