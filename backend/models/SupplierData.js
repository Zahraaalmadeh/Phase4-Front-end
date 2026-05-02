import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
    {
        supplierId: {
            type: String,
            required: [true, "Supplier ID is required"],
            unique: true,
            trim: true,
            uppercase: true
        },
        password: {
            type: String,
            required: true
        },
        companyName: {
            type: String,
            required: [true, "Company name is required"],
            trim: true
        },
        contactPerson: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please provide a valid email"
            ]
        },
        phone: {
            type: String,
            trim: true
        },
        address: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            trim: true
        },
        products: {
            type: [String],
            required: true,
            validate: {
                validator: function (v) {
                    return v && v.length > 0;
                },
                message: "At least one product category is required"
            }
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

// Only keep indexes that are NOT already covered by `unique`
supplierSchema.index({ isActive: 1 });

export default mongoose.model("Supplier", supplierSchema);