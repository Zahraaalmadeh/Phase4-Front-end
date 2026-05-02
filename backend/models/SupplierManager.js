import Supplier from "./SupplierData.js";
import SupplierRequest from "./SupplierRequests.js";
import SupplierAvailability from "./SupplierAvailability.js";
import SupplierDocument from "./SupplierDocuments.js";
import SupplierMessage from "./SupplierMessages.js";

export const getAllSuppliers = async (filters = {}) => {
    try {
        const query = { isActive: true };

        if (filters.city) query.city = filters.city;
        if (filters.country) query.country = filters.country;
        if (filters.product) query.products = { $in: [filters.product] };
        if (filters.minRating) query.rating = { $gte: Number(filters.minRating) };

        const suppliers = await Supplier.find(query).select("-__v");
        return { success: true, data: suppliers };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const getSupplierById = async (supplierId) => {
    try {
        const supplier = await Supplier.findById(supplierId).select("-__v");

        if (!supplier) {
            return { success: false, message: "Supplier not found" };
        }

        return { success: true, data: supplier };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const getSupplierByEmail = async (email) => {
    try {
        const supplier = await Supplier.findOne({ email: email.toLowerCase() }).select("-__v");

        if (!supplier) {
            return { success: false, message: "Supplier not found" };
        }

        return { success: true, data: supplier };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const createSupplier = async (supplierData) => {
    try {
        if (
            !supplierData.supplierId ||
            !supplierData.companyName ||
            !supplierData.email ||
            !supplierData.products ||
            supplierData.products.length === 0
        ) {
            return { success: false, message: "Missing required fields" };
        }

        const existingSupplier = await Supplier.findOne({
            $or: [
                { supplierId: supplierData.supplierId.toUpperCase() },
                { email: supplierData.email.toLowerCase() }
            ]
        });

        if (existingSupplier) {
            return {
                success: false,
                message: "Supplier with this ID or email already exists"
            };
        }

        const newSupplier = new Supplier({
            ...supplierData,
            supplierId: supplierData.supplierId.toUpperCase(),
            email: supplierData.email.toLowerCase()
        });

        const savedSupplier = await newSupplier.save();

        return {
            success: true,
            data: savedSupplier,
            message: "Supplier created successfully"
        };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const updateSupplier = async (supplierId, updateData) => {
    try {
        delete updateData.supplierId;

        if (updateData.email) {
            updateData.email = updateData.email.toLowerCase();
        }

        const updatedSupplier = await Supplier.findByIdAndUpdate(
            supplierId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedSupplier) {
            return { success: false, message: "Supplier not found" };
        }

        return {
            success: true,
            data: updatedSupplier,
            message: "Supplier updated successfully"
        };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const deleteSupplier = async (supplierId) => {
    try {
        const deletedSupplier = await Supplier.findByIdAndUpdate(
            supplierId,
            { isActive: false },
            { new: true }
        );

        if (!deletedSupplier) {
            return { success: false, message: "Supplier not found" };
        }

        return { success: true, message: "Supplier deleted successfully" };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const searchSuppliers = async (searchTerm) => {
    try {
        if (!searchTerm) {
            return { success: false, message: "Search term is required" };
        }

        const suppliers = await Supplier.find({
            isActive: true,
            $or: [
                { companyName: { $regex: searchTerm, $options: "i" } },
                { email: { $regex: searchTerm, $options: "i" } },
                { city: { $regex: searchTerm, $options: "i" } },
                { country: { $regex: searchTerm, $options: "i" } },
                { products: { $in: [new RegExp(searchTerm, "i")] } }
            ]
        }).select("-__v");

        return { success: true, data: suppliers };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const getSupplierRating = async (supplierId) => {
    try {
        const supplier = await Supplier.findById(supplierId).select("rating companyName");

        if (!supplier) {
            return { success: false, message: "Supplier not found" };
        }

        return {
            success: true,
            data: {
                supplierId,
                companyName: supplier.companyName,
                rating: supplier.rating
            }
        };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const updateSupplierRating = async (supplierId, newRating) => {
    try {
        if (newRating < 0 || newRating > 5) {
            return { success: false, message: "Rating must be between 0 and 5" };
        }

        const updatedSupplier = await Supplier.findByIdAndUpdate(
            supplierId,
            { rating: newRating },
            { new: true, runValidators: true }
        );

        if (!updatedSupplier) {
            return { success: false, message: "Supplier not found" };
        }

        return { success: true, data: updatedSupplier };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const createSupplierRequest = async (requestData) => {
    try {
        const newRequest = new SupplierRequest(requestData);
        const savedRequest = await newRequest.save();

        return {
            success: true,
            data: savedRequest,
            message: "Request created successfully"
        };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const getSupplierRequests = async (supplierId, filters = {}) => {
    try {
        const query = { supplierId };

        if (filters.status) query.status = filters.status;
        if (filters.dateFrom) {
            query.requestedDate = { $gte: new Date(filters.dateFrom) };
        }

        const requests = await SupplierRequest.find(query)
            .populate("supplierId", "companyName email")
            .sort({ requestedDate: -1 });

        return { success: true, data: requests };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const updateRequestStatus = async (requestId, newStatus) => {
    try {
        const validStatuses = [
            "pending",
            "accepted",
            "rejected",
            "in-progress",
            "completed",
            "cancelled"
        ];

        if (!validStatuses.includes(newStatus)) {
            return { success: false, message: "Invalid status" };
        }

        const updatedRequest = await SupplierRequest.findByIdAndUpdate(
            requestId,
            { status: newStatus },
            { new: true, runValidators: true }
        );

        if (!updatedRequest) {
            return { success: false, message: "Request not found" };
        }

        return { success: true, data: updatedRequest };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const setSupplierAvailability = async (supplierId, availabilityData) => {
    try {
        let availability = await SupplierAvailability.findOne({ supplierId });

        if (availability) {
            Object.assign(availability, availabilityData);
            await availability.save();
        } else {
            availability = await SupplierAvailability.create({
                supplierId,
                ...availabilityData
            });
        }

        return {
            success: true,
            data: availability,
            message: "Availability updated successfully"
        };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const getSupplierAvailability = async (supplierId) => {
    try {
        const availability = await SupplierAvailability.findOne({ supplierId });

        if (!availability) {
            return { success: false, message: "Availability not found" };
        }

        return { success: true, data: availability };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const checkSupplierAvailability = async (supplierId, requestedDate) => {
    try {
        const availability = await SupplierAvailability.findOne({ supplierId });

        if (!availability) {
            return {
                success: false,
                message: "Availability not found",
                isAvailable: false
            };
        }

        const date = new Date(requestedDate);

        const isDateInRange =
            date >= new Date(availability.availableFrom) &&
            date <= new Date(availability.availableTo);

        const canAcceptMore = availability.currentOrders < availability.maxCapacity;

        const isAvailable =
            availability.status === "available" &&
            isDateInRange &&
            canAcceptMore;

        return {
            success: true,
            data: {
                isAvailable,
                status: availability.status,
                currentOrders: availability.currentOrders,
                maxCapacity: availability.maxCapacity,
                availableFrom: availability.availableFrom,
                availableTo: availability.availableTo
            }
        };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const uploadDocument = async (supplierId, documentData) => {
    try {
        const newDocument = new SupplierDocument({
            supplierId,
            ...documentData
        });

        const savedDocument = await newDocument.save();

        return {
            success: true,
            data: savedDocument,
            message: "Document uploaded successfully"
        };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const getSupplierDocuments = async (supplierId, documentType = null) => {
    try {
        const query = { supplierId };

        if (documentType) {
            query.documentType = documentType;
        }

        const documents = await SupplierDocument.find(query).sort({ uploadDate: -1 });

        return { success: true, data: documents };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const deleteDocument = async (documentId) => {
    try {
        const deletedDocument = await SupplierDocument.findByIdAndDelete(documentId);

        if (!deletedDocument) {
            return { success: false, message: "Document not found" };
        }

        return { success: true, message: "Document deleted successfully" };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const verifyDocument = async (documentId, isVerified) => {
    try {
        const updatedDocument = await SupplierDocument.findByIdAndUpdate(
            documentId,
            { isVerified },
            { new: true, runValidators: true }
        );

        if (!updatedDocument) {
            return { success: false, message: "Document not found" };
        }

        return { success: true, data: updatedDocument };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const sendMessage = async (messageData) => {
    try {
        const newMessage = new SupplierMessage(messageData);
        const savedMessage = await newMessage.save();

        return {
            success: true,
            data: savedMessage,
            message: "Message sent successfully"
        };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const getSupplierMessages = async (supplierId, userId) => {
    try {
        const messages = await SupplierMessage.find({
            supplierId,
            $or: [{ senderId: userId }, { recipientId: userId }]
        }).sort({ createdAt: -1 });

        return { success: true, data: messages };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const markMessageAsRead = async (messageId) => {
    try {
        const updatedMessage = await SupplierMessage.findByIdAndUpdate(
            messageId,
            { isRead: true, readAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!updatedMessage) {
            return { success: false, message: "Message not found" };
        }

        return { success: true, data: updatedMessage };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const getUnreadMessages = async (recipientId, supplierId) => {
    try {
        const unreadMessages = await SupplierMessage.find({
            recipientId,
            supplierId,
            isRead: false
        }).sort({ createdAt: -1 });

        return {
            success: true,
            data: unreadMessages,
            count: unreadMessages.length
        };
    } catch (error) {
        return { success: false, message: error.message };
    }
};