import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true,
        unique: true
    },
    availableFrom: {
        type: Date,
        required: true
    },
    availableTo: {
        type: Date,
        required: true
    },
    timeSlots: [
        {
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            },
            startTime: String,
            endTime: String,
            isAvailable: Boolean
        }
    ],
    maxCapacity: {
        type: Number,
        default: 100
    },
    currentOrders: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['available', 'busy', 'unavailable'],
        default: 'available'
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

export default mongoose.model('SupplierAvailability', availabilitySchema);