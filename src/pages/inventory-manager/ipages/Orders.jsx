import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Layout from "../iLayout";
import Sidebar from "../icomponents/iSidebar";

function Orders({ orders, setOrders  }) {
    const [orderForm, setOrderForm] = useState({
        supplier: "",
        itemName: "",
        quantity: "",
        deliveryInfo: "",
    });

    
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [rejectingOrderId, setRejectingOrderId] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const [activeMessageOrderId, setActiveMessageOrderId] = useState(null);
    const [messageText, setMessageText] = useState("");

    function handleSubmitOrder() {
        if (
            orderForm.supplier.trim() === "" ||
            orderForm.itemName.trim() === "" ||
            orderForm.quantity === "" ||
            orderForm.deliveryInfo.trim() === ""
        ) {
            setErrorMessage("Please fill in all order fields.");
            setSuccessMessage("");
            return;
        }

        if (Number(orderForm.quantity) <= 0) {
            setErrorMessage("Order quantity must be greater than 0.");
            setSuccessMessage("");
            return;
        }

        const newOrder = {
            id: `ORD-${Date.now()}`,
            supplier: orderForm.supplier,
            itemName: orderForm.itemName,
            quantity: Number(orderForm.quantity),
            deliveryInfo: orderForm.deliveryInfo,
            date: new Date().toISOString().split("T")[0],
            status: "Pending",
            rejectionReason: "",
            messages: [],
        };

        setOrders([...orders, newOrder]);

        setOrderForm({
            supplier: "",
            itemName: "",
            quantity: "",
            deliveryInfo: "",
        });

        setErrorMessage("");
        setSuccessMessage(`Order submitted successfully (${newOrder.id}).`);
    }

    function handleUpdateOrderStatus(orderId, newStatus) {
        const updatedOrders = orders.map((order) =>
            order.id === orderId
                ? { ...order, status: newStatus, rejectionReason: "" }
                : order
        );

        setOrders(updatedOrders);
        setRejectingOrderId(null);
        setRejectionReason("");
    }

    function handleStartReject(orderId) {
        setRejectingOrderId(orderId);
        setRejectionReason("");
    }

    function handleConfirmReject(orderId) {
        if (rejectionReason.trim() === "") {
            setErrorMessage("Rejection reason is required.");
            return;
        }

        const updatedOrders = orders.map((order) =>
            order.id === orderId
                ? {
                      ...order,
                      status: "Rejected",
                      rejectionReason: rejectionReason,
                  }
                : order
        );

        setOrders(updatedOrders);
        setRejectingOrderId(null);
        setRejectionReason("");
        setErrorMessage("");
    }
    const navigate = useNavigate();

        function handleLogout() {
            navigate("/");
        }
        function handleOpenMessages(orderId) {
        setActiveMessageOrderId(orderId);
        setMessageText("");
        setErrorMessage("");
    }

    function handleSendMessage(orderId) {
        if (messageText.trim() === "") {
            setErrorMessage("Message cannot be empty.");
            return;
        }

        if (messageText.length > 1000) {
            setErrorMessage("Message must be 1000 characters or less.");
            return;
        }

        const updatedOrders = orders.map((order) =>
            order.id === orderId
                ? {
                    ...order,
                    messages: [
                        ...(order.messages || []),
                        {
                            id: Date.now(),
                            text: messageText,
                            sender: "Inventory Manager",
                            timestamp: new Date().toLocaleString(),
                        },
                    ],
                }
                : order
        );

        setOrders(updatedOrders);
        setMessageText("");
        setErrorMessage("");
        setSuccessMessage("Message sent successfully.");
    }

    return (
        <Layout>
            <div className="page-with-sidebar">
            <Sidebar />
            <div className="main-content-area">
        <div className="page-container">
        <div className="inventory-header">
            <div>
                <h1 className="brand-title">Orders</h1>
                <p className="brand-subtitle">Create, review, approve, and reject supplier orders</p>
            </div>

            
        </div>

        <div className="card">
            <h2>Create New Order</h2>

            <div className="form-grid">
                <input
                    type="text"
                    placeholder="Enter supplier name"
                    value={orderForm.supplier}
                    onChange={(e) =>
                        setOrderForm({
                            ...orderForm,
                            supplier: e.target.value,
                        })
                    }
                />

                <input
                    type="text"
                    placeholder="Enter item name"
                    value={orderForm.itemName}
                    onChange={(e) =>
                        setOrderForm({
                            ...orderForm,
                            itemName: e.target.value,
                        })
                    }
                />

                <input
                    type="number"
                    placeholder="Enter quantity"
                    value={orderForm.quantity}
                    onChange={(e) =>
                        setOrderForm({
                            ...orderForm,
                            quantity: e.target.value,
                        })
                    }
                />

                <input
                    type="text"
                    placeholder="Enter delivery info"
                    value={orderForm.deliveryInfo}
                    onChange={(e) =>
                        setOrderForm({
                            ...orderForm,
                            deliveryInfo: e.target.value,
                        })
                    }
                />
            </div>

            <div className="actions-row">
                <button onClick={handleSubmitOrder}>Submit Order</button>
            </div>

            {errorMessage && <p className="message-error">{errorMessage}</p>}
            {successMessage && <p className="message-success">{successMessage}</p>}
        </div>

        <div className="card">
            <div className="inventory-list-header">
                <h2>Order Requests</h2>
                <p className="muted-text">Total orders: {orders.length}</p>
            </div>

            {orders.length === 0 && <p>No orders yet.</p>}

            <div className="inventory-items">
                {orders.map((order) => (
                    <div key={order.id} className="list-item">
                        <div className="item-main-info">
                            <h4>{order.id}</h4>
                            <p>Item: {order.itemName}</p>
                            <p>Supplier: {order.supplier}</p>
                            <p>Quantity: {order.quantity}</p>
                            <p>Delivery: {order.deliveryInfo}</p>
                            <p>Date: {order.date}</p>
                        </div>

                        <div className="item-side-info">
                            <span
                                className={`status-badge status-${order.status.toLowerCase()}`}
                            >
                                {order.status}
                            </span>

                            <div className="actions-row">
                                <button onClick={() => handleUpdateOrderStatus(order.id, "Approved")}>
                                    Approve
                                </button>

                                <button onClick={() => handleStartReject(order.id)}>
                                    Reject
                                </button>

                                <button onClick={() => handleOpenMessages(order.id)}>
                                    Messages
                                </button>
                            </div>

                            {rejectingOrderId === order.id && (
                                <div className="card" style={{ width: "100%" }}>
                                    <input
                                        type="text"
                                        placeholder="Enter rejection reason"
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                    />
                                    <div className="actions-row">
                                        <button onClick={() => handleConfirmReject(order.id)}>
                                            Confirm Reject
                                        </button>
                                    </div>
                                </div>
                            )}

                            {order.rejectionReason && (
                                <p className="message-error">
                                    Rejection Reason: {order.rejectionReason}
                                </p>
                            )}

                            {activeMessageOrderId === order.id && (
                                <div className="card" style={{ width: "100%" }}>
                                    <h4>Conversation</h4>

                                    {(!order.messages || order.messages.length === 0) && (
                                        <p>No messages yet.</p>
                                    )}

                                    {order.messages &&
                                        order.messages.map((message) => (
                                            <p key={message.id}>
                                                <strong>{message.sender}:</strong> {message.text} ({message.timestamp})
                                            </p>
                                        ))}

                                    <input
                                        type="text"
                                        placeholder="Type message"
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                    />

                                    <div className="actions-row">
                                        <button onClick={() => handleSendMessage(order.id)}>
                                            Send
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </div>
    </div>
    </Layout>
    );
}

export default Orders;