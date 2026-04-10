import { useEffect, useState } from "react";

const allowedProgression = {
    New: ["Confirmed", "Shipped"],
    Pending: ["Confirmed", "Shipped"],
    "Under Review": ["Confirmed", "Shipped"],
    Confirmed: ["Shipped"],
    Shipped: ["Delivered"],
    Delivered: [],
};

export default function StatusUpdateForm({ request, onSave }) {
    const [status, setStatus] = useState("");
    const [trackingNumber, setTrackingNumber] = useState(
        request?.trackingNumber || ""
    );
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    useEffect(() => {
        setStatus("");
        setTrackingNumber(request?.trackingNumber || "");
        setMessage("");
        setMessageType("");
    }, [request]);

    const handleSubmit = () => {
        if (!status) {
            setMessage("Please select a status.");
            setMessageType("error");
            return;
        }

        const validNextStatuses = allowedProgression[request.status] || [];
        if (!validNextStatuses.includes(status)) {
            setMessage(`Cannot mark ${status} directly from ${request.status}.`);
            setMessageType("error");
            return;
        }

        if (status === "Shipped") {
            const trimmed = trackingNumber.trim();
            const validTracking = /^[A-Za-z0-9-]{3,30}$/.test(trimmed);

            if (!validTracking) {
                setMessage("Please provide a valid tracking number.");
                setMessageType("error");
                return;
            }
        }

        onSave({
            requestId: request.id,
            status,
            trackingNumber: trackingNumber.trim(),
        });

        setMessage("Request status updated successfully.");
        setMessageType("success");
    };

    return (
        <div className="form-block polished-form-card">
            <div className="form-card-header">
                <h4>Status Update</h4>
                <p>Update the request progress and shipment state.</p>
            </div>

            <label>Status Update</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
            </select>

            <label>Tracking Number</label>
            <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Required for shipped items"
                disabled={status !== "Shipped"}
            />

            <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                Update Status
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