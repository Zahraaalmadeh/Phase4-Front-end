import { useEffect, useMemo, useState } from "react";
import Layout from "../Layout";
import SupplierLoginForm from "../components/supplier/SupplierLoginForm";
import SupplierSidebar from "../components/supplier/SupplierSidebar";
import NotificationList from "../components/supplier/NotificationList";
import RequestList from "../components/supplier/RequestList";
import RequestDetails from "../components/supplier/RequestDetails";
import MessagePanel from "../components/supplier/MessagePanel";
import DocumentUploadPanel from "../components/supplier/DocumentUploadPanel";
import {
    supplierAccount,
    initialNotifications,
    initialRequests,
    initialMessages,
    initialDocuments,
} from "../data/supplierData";

const STORAGE_KEYS = {
    session: "makhzan_supplier_session",
    lockUntil: "makhzan_supplier_lock_until",
    requests: "makhzan_supplier_requests",
    notifications: "makhzan_supplier_notifications",
    messages: "makhzan_supplier_messages",
    documents: "makhzan_supplier_documents",
};

function getStoredJSON(key, fallbackValue) {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallbackValue;
}

export default function SupplierPage() {
    const [loggedInUser, setLoggedInUser] = useState(
        getStoredJSON(STORAGE_KEYS.session, null)
    );
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
    const [activeTab, setActiveTab] = useState("notifications");
    const [selectedRequestId, setSelectedRequestId] = useState(
        initialRequests[0]?.id || null
    );

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

    useEffect(() => {
        if (loggedInUser) {
            localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(loggedInUser));
        } else {
            localStorage.removeItem(STORAGE_KEYS.session);
        }
    }, [loggedInUser]);

    const assignedRequests = useMemo(() => {
        if (!loggedInUser) return [];
        return requests
            .filter((request) => request.assignedSupplierId === loggedInUser.username)
            .sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));
    }, [requests, loggedInUser]);

    const assignedNotifications = useMemo(() => {
        if (!loggedInUser) return [];
        return notifications.filter(
            (item) => item.assignedSupplierId === loggedInUser.username
        );
    }, [notifications, loggedInUser]);

    const selectedRequest = useMemo(() => {
        return assignedRequests.find((request) => request.id === selectedRequestId) || null;
    }, [assignedRequests, selectedRequestId]);

    const handleLogin = ({ identifier }) => {
        const user =
            identifier === supplierAccount.email ||
            identifier === supplierAccount.username
                ? {
                    username: supplierAccount.username,
                    email: supplierAccount.email,
                }
                : null;

        setLoggedInUser(user);
        setActiveTab("notifications");
        if (!selectedRequestId && assignedRequests.length > 0) {
            setSelectedRequestId(assignedRequests[0].id);
        }
    };

    const handleLogout = () => {
        setLoggedInUser(null);
        setActiveTab("notifications");
    };

    const addAuditEntry = (requestId, action) => {
        const now = new Date().toLocaleString();
        setRequests((current) =>
            current.map((request) =>
                request.id === requestId
                    ? {
                        ...request,
                        auditHistory: [
                            {
                                id: crypto.randomUUID(),
                                action,
                                timestamp: now,
                            },
                            ...request.auditHistory,
                        ],
                    }
                    : request
            )
        );
    };

    const handleOpenNotification = (notificationId) => {
        const clicked = assignedNotifications.find((item) => item.id === notificationId);
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

    const handleSaveDelivery = ({ requestId, estimatedDelivery, deliveryNotes }) => {
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
                        trackingNumber: trackingNumber || request.trackingNumber,
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
                id: crypto.randomUUID(),
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
                id: crypto.randomUUID(),
                type,
                fileName,
                uploadedAt: new Date().toLocaleString(),
            },
            ...current,
        ]);
    };

    if (!loggedInUser) {
        return (
            <div className="supplier-login-shell">
                <SupplierLoginForm
                    supplierAccount={supplierAccount}
                    lockStorageKey={STORAGE_KEYS.lockUntil}
                    onLogin={handleLogin}
                />
            </div>
        );
    }

    return (
        <Layout>
            <div className="supplier-page">
                <div className="topbar">
                    <div className="topbar-title">
                        <h1>Supplier Dashboard</h1>
                        <p>
                            Manage assigned requests, update delivery status, upload documents,
                            and communicate with the inventory manager.
                        </p>
                    </div>
                </div>

                <div className="dashboard-grid">
                    <SupplierSidebar activeTab={activeTab} onChangeTab={setActiveTab} />

                    <section className="main-panels">
                        {activeTab === "notifications" && (
                            <NotificationList
                                notifications={assignedNotifications}
                                onOpenNotification={handleOpenNotification}
                            />
                        )}

                        {activeTab === "requests" && (
                            <div className="card panel-card">
                                <div className="section-header">
                                    <h2>Assigned Requests</h2>
                                </div>

                                <div className="request-layout">
                                    <RequestList
                                        requests={assignedRequests}
                                        selectedRequestId={selectedRequestId}
                                        onSelect={setSelectedRequestId}
                                    />

                                    <RequestDetails
                                        request={selectedRequest}
                                        onSaveAvailability={handleSaveAvailability}
                                        onSaveDelivery={handleSaveDelivery}
                                        onSaveStatus={handleSaveStatus}
                                    />
                                </div>
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