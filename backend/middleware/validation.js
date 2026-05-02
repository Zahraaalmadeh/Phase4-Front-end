// Validate supplier data
export const validateSupplier = (req, res, next) => {
    const { supplierId, companyName, email, products } = req.body;

    // Check required fields
    if (!supplierId || !companyName || !email || !products) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields: supplierId, companyName, email, products'
        });
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email format'
        });
    }

    // Validate products array
    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Products must be a non-empty array'
        });
    }

    next();
};

// Validate availability data
export const validateAvailability = (req, res, next) => {
    const { availableFrom, availableTo, maxCapacity } = req.body;

    if (!availableFrom || !availableTo) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields: availableFrom, availableTo'
        });
    }

    const from = new Date(availableFrom);
    const to = new Date(availableTo);

    if (from >= to) {
        return res.status(400).json({
            success: false,
            message: 'availableFrom must be before availableTo'
        });
    }

    if (maxCapacity && maxCapacity <= 0) {
        return res.status(400).json({
            success: false,
            message: 'maxCapacity must be greater than 0'
        });
    }

    next();
};

// Validate request data
export const validateRequest = (req, res, next) => {
    const { requestId, productName, quantity, dueDate } = req.body;

    if (!requestId || !productName || !quantity || !dueDate) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields: requestId, productName, quantity, dueDate'
        });
    }

    if (quantity <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Quantity must be greater than 0'
        });
    }

    next();
};

// Validate document data
export const validateDocument = (req, res, next) => {
    const { documentId, documentType, fileName, filePath } = req.body;

    if (!documentId || !documentType || !fileName || !filePath) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields: documentId, documentType, fileName, filePath'
        });
    }

    const validTypes = ['license', 'certificate', 'invoice', 'report', 'contract', 'other'];
    if (!validTypes.includes(documentType)) {
        return res.status(400).json({
            success: false,
            message: `Invalid documentType. Must be one of: ${validTypes.join(', ')}`
        });
    }

    next();
};

// Validate message data
export const validateMessage = (req, res, next) => {
    const { messageId, senderId, senderRole, recipientId, supplierId, subject, messageContent } = req.body;

    if (!messageId || !senderId || !senderRole || !recipientId || !supplierId || !subject || !messageContent) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields'
        });
    }

    const validRoles = ['supplier', 'customer', 'admin'];
    if (!validRoles.includes(senderRole)) {
        return res.status(400).json({
            success: false,
            message: `Invalid senderRole. Must be one of: ${validRoles.join(', ')}`
        });
    }

    next();
};