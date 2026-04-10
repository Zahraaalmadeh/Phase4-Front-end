import { useEffect, useState } from "react";

export default function DeliveryEstimateForm({ request, onSave }) {
    const [estimatedDelivery, setEstimatedDelivery] = useState(
        request?.estimatedDelivery || ""
    );
    const [deliveryNotes, setDeliveryNotes] = useState(
        request?.deliveryNotes || ""
    );
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    useEffect(() => {
        setEstimatedDelivery(request?.estimatedDelivery || "");
        setDeliveryNotes(request?.deliveryNotes || "");
        setMessage("");
        setMessageType("");
    }, [request]);

    const handleSubmit = () => {
        if (!estimatedDelivery) {
            setMessage("Please select a delivery date.");
            setMessageType("error");
            return;
        }

        const selectedDate = new Date(estimatedDelivery);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            setMessage("Delivery date must not be in the past.");
            setMessageType("error");
            return;
        }

        const ninetyDaysLater = new Date();
        ninetyDaysLater.setDate(ninetyDaysLater.getDate() + 90);

        if (selectedDate > ninetyDaysLater) {
            setMessage("Please select a realistic delivery date.");
            setMessageType("error");
            return;
        }

        onSave({
            requestId: request.id,
            estimatedDelivery,
            deliveryNotes,
        });

        setMessage("Estimated delivery time saved successfully.");
        setMessageType("success");
    };

    return (
        <div className="form-block polished-form-card">
            <div className="form-card-header">
                <h4>Delivery Estimate</h4>
                <p>Provide the expected delivery timeline for this request.</p>
            </div>

            <label>Delivery Date</label>
            <input
                type="date"
                value={estimatedDelivery}
                onChange={(e) => setEstimatedDelivery(e.target.value)}
            />

            <label>Notes</label>
            <textarea
                rows="4"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                placeholder="Optional notes about shipment or preparation"
            />

            <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                Save Delivery Estimate
            </button>

            {message && (
                <p
                    className={
                        messageType === "error"
                            ? "status-danger"
                            : "status-success"
                    }
                >
                    {message}
                </p>
            )}
        </div>
    );
}