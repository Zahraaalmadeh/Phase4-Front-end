import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
    {
        supplierId: {
            type: String,
            required: [true, "Supplier ID is required"],
            unique: true,
            trim: true,
            uppercase: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            trim: true,
        },

        companyName: {
            type: String,
            required: [true, "Company name is required"],
            trim: true,
        },

        contactPerson: {
            type: String,
            required: [true, "Contact person is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please provide a valid email",
            ],
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
        },

        address: {
            type: String,
            required: [true, "Address is required"],
            trim: true,
        },

        city: {
            type: String,
            required: [true, "City is required"],
            trim: true,
        },

        country: {
            type: String,
            required: [true, "Country is required"],
            trim: true,
        },

        products: {
            type: [String],
            required: true,
            validate: {
                validator: function (v) {
                    return v && v.length > 0;
                },
                message: "At least one product category is required",
            },
        },

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "suppliers",
    }
);

// Keep only non-duplicate indexes
supplierSchema.index({ city: 1 });
supplierSchema.index({ country: 1 });
supplierSchema.index({ isActive: 1 });

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;