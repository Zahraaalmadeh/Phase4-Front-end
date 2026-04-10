import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/supplier.css";
import Layout from "../Layout";
import SupplierSidebar from "../components/supplier/SupplierSidebar";
import RequestList from "../components/supplier/RequestList";
import RequestDetails from "../components/supplier/RequestDetails";
import MessagePanel from "../components/supplier/MessagePanel";
import DocumentUploadPanel from "../components/supplier/DocumentUploadPanel";
import {
    initialNotifications,
    initialRequests,
    initialMessages,
    initialDocuments,
} from "../data/supplierData";

const STORAGE_KEYS = {
    session: "session",
    requests: "makhzan_supplier_requests",
    notifications: "makhzan_supplier_notifications",
    messages: "makhzan_supplier_messages",
    documents: "makhzan_supplier_documents",
};

function getStoredJSON(key, fallbackValue) {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallbackValue;
    } catch (error) {
        console.error(`Invalid JSON in localStorage for key: ${key}`, error);
        return fallbackValue;
    }
}

function generateId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random()}`;
}

export default function SupplierPage() {
    const navigate = useNavigate();

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [notifications, setNotifications] = useState(
        getStoredJSON(STORAGE_KEYS.notifications, initialNotifications)
    );
    const [requests, setRequests] = useState(
        getStoredJSON(STORAGE_KEYS.requests, initialRequests)
    );
    const [messages, setMessages] = useState(
        getStoredJSON(STORAGE_KEYS.messages, initialMessages)
    );
    const [documents, setDocuments] = useState(
        getStoredJSON(STORAGE_KEYS.documents, initialDocuments)
    );

    const [activeTab, setActiveTab] = useState("requests");
    const [selectedRequestId, setSelectedRequestId] = useState(null);

    useEffect(() => {
        const session = getStoredJSON(STORAGE_KEYS.session, null);

        if (!session || typeof session !== "object") {
            navigate("/login");
            return;
        }

        if (session.role !== "supplier") {
            navigate("/login");
            return;
        }

        setLoggedInUser(session);
    }, [navigate]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.requests, JSON.stringify(requests));
    }, [requests]);

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEYS.notifications,
            JSON.stringify(notifications)
        );
    }, [notifications]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.documents, JSON.stringify(documents));
    }, [documents]);

    const assignedRequests = useMemo(() => {
        if (!loggedInUser) return [];

        return requests
            .filter(
                (request) => request.assignedSupplierId === loggedInUser.username
            )
            .sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));
    }, [requests, loggedInUser]);

    const assignedNotifications = useMemo(() => {
        if (!loggedInUser) return [];

        return notifications.filter(
            (item) => item.assignedSupplierId === loggedInUser.username
        );
    }, [notifications, loggedInUser]);

    const selectedRequest = useMemo(() => {
        return (
            assignedRequests.find((request) => request.id === selectedRequestId) ||
            null
        );
    }, [assignedRequests, selectedRequestId]);

    useEffect(() => {
        if (assignedRequests.length > 0 && !selectedRequestId) {
            setSelectedRequestId(assignedRequests[0].id);
        }
    }, [assignedRequests, selectedRequestId]);

    const addAuditEntry = (requestId, action) => {
        const now = new Date().toLocaleString();

        setRequests((current) =>
            current.map((request) =>
                request.id === requestId
                    ? {
                        ...request,
                        auditHistory: [
                            {
                                id: generateId(),
                                action,
                                timestamp: now,
                            },
                            ...(request.auditHistory || []),
                        ],
                    }
                    : request
            )
        );
    };

    const handleOpenNotification = (notificationId) => {
        const clicked = assignedNotifications.find(
            (item) => item.id === notificationId
        );

        if (!clicked) return;

        setNotifications((current) =>
            current.map((item) =>
                item.id === notificationId ? { ...item, unread: false } : item
            )
        );

        setSelectedRequestId(clicked.requestId);
        setActiveTab("requests");
    };

    const handleSaveAvailability = ({
                                        requestId,
                                        availabilityStatus,
                                        availableQuantity,
                                    }) => {
        setRequests((current) =>
            current.map((request) =>
                request.id === requestId
                    ? {
                        ...request,
                        availabilityStatus,
                        availableQuantity,
                        status:
                            availabilityStatus === "Available"
                                ? "Confirmed"
                                : availabilityStatus === "Partially Available"
                                    ? "Under Review"
                                    : "Under Review",
                    }
                    : request
            )
        );

        addAuditEntry(
            requestId,
            `Availability submitted: ${availabilityStatus}${
                availableQuantity ? ` (${availableQuantity} units)` : ""
            }`
        );
    };

    const handleSaveDelivery = ({
                                    requestId,
                                    estimatedDelivery,
                                    deliveryNotes,
                                }) => {
        setRequests((current) =>
            current.map((request) =>
                request.id === requestId
                    ? {
                        ...request,
                        estimatedDelivery,
                        deliveryNotes,
                    }
                    : request
            )
        );

        addAuditEntry(
            requestId,
            `Estimated delivery date set to ${estimatedDelivery}`
        );
    };

    const handleSaveStatus = ({ requestId, status, trackingNumber }) => {
        setRequests((current) =>
            current.map((request) =>
                request.id === requestId
                    ? {
                        ...request,
                        status,
                        trackingNumber:
                            trackingNumber || request.trackingNumber,
                    }
                    : request
            )
        );

        addAuditEntry(
            requestId,
            `Request status updated to ${status}${
                trackingNumber ? ` with tracking number ${trackingNumber}` : ""
            }`
        );
    };

    const handleSendMessage = ({ requestId, text }) => {
        setMessages((current) => [
            {
                id: generateId(),
                requestId: requestId || "General",
                sender: "Supplier",
                text,
                timestamp: new Date().toLocaleString(),
            },
            ...current,
        ]);
    };

    const handleUploadDocument = ({ type, fileName }) => {
        setDocuments((current) => [
            {
                id: generateId(),
                type,
                fileName,
                uploadedAt: new Date().toLocaleString(),
            },
            ...current,
        ]);
    };

    if (!loggedInUser || loggedInUser.role !== "supplier") {
        return null;
    }

    return (
        <Layout
            supplierNotifications={assignedNotifications}
            onOpenSupplierNotification={handleOpenNotification}
        >
            <div className="supplier-page">
                <div className="topbar">
                    <div className="topbar-title">
                        <span className="dashboard-kicker">Supplier Workspace</span>
                        <h1>Supplier Dashboard</h1>
                        <p>
                            Review assigned requests, confirm availability,
                            provide delivery estimates, upload documents, and
                            communicate with the inventory manager.
                        </p>
                    </div>
                </div>

                <div className="dashboard-grid">
                    <SupplierSidebar
                        activeTab={activeTab}
                        onChangeTab={setActiveTab}
                    />

                    <section className="main-panels">
                        {activeTab === "requests" && (
                            <div className="card panel-card">
                                <div className="section-header">
                                    <div>
                                        <span className="section-kicker">
                                            Assigned work
                                        </span>
                                        <h2>Requests Overview</h2>
                                    </div>

                                    <div className="summary-pill">
                                        {assignedRequests.length} Request
                                        {assignedRequests.length !== 1 ? "s" : ""}
                                    </div>
                                </div>

                                {assignedRequests.length === 0 ? (
                                    <div className="empty-state">
                                        <h3>No assigned requests yet</h3>
                                        <p>
                                            New supplier requests will appear here
                                            once they are assigned to you.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="request-layout">
                                        <div className="request-column">
                                            <RequestList
                                                requests={assignedRequests}
                                                selectedRequestId={selectedRequestId}
                                                onSelect={setSelectedRequestId}
                                            />
                                        </div>

                                        <div className="details-column">
                                            <RequestDetails
                                                request={selectedRequest}
                                                onSaveAvailability={
                                                    handleSaveAvailability
                                                }
                                                onSaveDelivery={
                                                    handleSaveDelivery
                                                }
                                                onSaveStatus={handleSaveStatus}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "messages" && (
                            <MessagePanel
                                selectedRequestId={selectedRequestId}
                                messages={messages}
                                onSendMessage={handleSendMessage}
                            />
                        )}

                        {activeTab === "documents" && (
                            <DocumentUploadPanel
                                documents={documents}
                                onUploadDocument={handleUploadDocument}
                            />
                        )}
                    </section>
                </div>
            </div>
        </Layout>
    );
}