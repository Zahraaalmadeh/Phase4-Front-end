import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    supplierId: {
        type: String,
        required: [true, 'Supplier ID is required'],
        unique: true,
        trim: true,
        uppercase: true
    },
    companyName: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
    },
    contactPerson: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    phone: {
        type: String,
        trim: true,
        match: [/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 'Please provide a valid phone number']
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
        default: [],
        validate: {
            validator: function(v) {
                return v && v.length > 0;
            },
            message: 'At least one product category is required'
        }
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot be more than 5']
    },
    isActive: {
        type: Boolean,
        default: true
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

// Index for faster queries
supplierSchema.index({ email: 1 });
supplierSchema.index({ supplierId: 1 });
supplierSchema.index({ isActive: 1 });

export default mongoose.model('Supplier', supplierSchema);