import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
    {
        supplierId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
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
                    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    required: true
                },
                startTime: {
                    type: String,
                    required: true
                },
                endTime: {
                    type: String,
                    required: true
                },
                isAvailable: {
                    type: Boolean,
                    default: true
                }
            }
        ],
        maxCapacity: {
            type: Number,
            default: 100,
            min: 1
        },
        currentOrders: {
            type: Number,
            default: 0,
            min: 0
        },
        status: {
            type: String,
            enum: ["available", "busy", "unavailable"],
            default: "available"
        }
    },
    { timestamps: true }
);

availabilitySchema.pre("save", function (next) {
    if (this.availableFrom > this.availableTo) {
        return next(new Error("availableFrom must be before availableTo"));
    }
    next();
});

export default mongoose.model("SupplierAvailability", availabilitySchema);