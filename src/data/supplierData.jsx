export const supplierAccount = {
    email: "supplier@makhzan.com",
    username: "supplier01",
    password: "Supplier123",
    active: true,
};

export const initialNotifications = [
    {
        id: 1,
        requestId: "REQ-001",
        product: "Blood Test Reagent",
        quantity: 40,
        urgency: "High",
        date: "2026-04-08",
        unread: true,
        assignedSupplierId: "supplier01",
    },
    {
        id: 2,
        requestId: "REQ-002",
        product: "Antibiotic Ampoules",
        quantity: 100,
        urgency: "Medium",
        date: "2026-04-07",
        unread: true,
        assignedSupplierId: "supplier01",
    },
];

export const initialRequests = [
    {
        id: "REQ-001",
        product: "Blood Test Reagent",
        quantity: 40,
        department: "Emergency",
        urgency: "High",
        requestDate: "2026-04-08",
        status: "New",
        availabilityStatus: "",
        availableQuantity: null,
        estimatedDelivery: "",
        deliveryNotes: "",
        trackingNumber: "",
        assignedSupplierId: "supplier01",
        auditHistory: [],
    },
    {
        id: "REQ-002",
        product: "Antibiotic Ampoules",
        quantity: 100,
        department: "Pharmacy",
        urgency: "Medium",
        requestDate: "2026-04-07",
        status: "Pending",
        availabilityStatus: "",
        availableQuantity: null,
        estimatedDelivery: "",
        deliveryNotes: "",
        trackingNumber: "",
        assignedSupplierId: "supplier01",
        auditHistory: [],
    },
];

export const initialMessages = [
    {
        id: 1,
        requestId: "REQ-001",
        sender: "Inventory Manager",
        text: "Please confirm availability as soon as possible.",
        timestamp: "2026-04-08 09:15",
    },
];

export const initialDocuments = [];