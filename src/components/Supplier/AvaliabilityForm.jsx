import { useEffect, useState } from "react";

export default function AvailabilityForm({ request, onSave }) {
    const [availabilityStatus, setAvailabilityStatus] = useState(
        request?.availabilityStatus || ""
    );
    const [availableQuantity, setAvailableQuantity] = useState(
        request?.availableQuantity ?? ""
    );
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    useEffect(() => {
        setAvailabilityStatus(request?.availabilityStatus || "");
        setAvailableQuantity(request?.availableQuantity ?? "");
        setMessage("");
        setMessageType("");
    }, [request]);

    const handleSubmit = () => {
        if (!availabilityStatus) {
            setMessage("Availability status is required.");
            setMessageType("error");
            return;
        }

        if (availabilityStatus === "Partially Available") {
            const numericValue = Number(availableQuantity);

            if (
                availableQuantity === "" ||
                Number.isNaN(numericValue) ||
                numericValue <= 0
            ) {
                setMessage("Please enter a valid positive quantity.");
                setMessageType("error");
                return;
            }
        }

        onSave({
            requestId: request.id,
            availabilityStatus,
            availableQuantity:
                availabilityStatus === "Partially Available"
                    ? Number(availableQuantity)
                    : null,
        });

        setMessage("Availability response saved successfully.");
        setMessageType("success");
    };

    return (
        <div className="form-block polished-form-card">
            <div className="form-card-header">
                <h4>Confirm Availability</h4>
                <p>Let the inventory manager know whether the item can be supplied.</p>
            </div>

            <div className="form-grid">
                <div>
                    <label>Availability Status</label>
                    <select
                        value={availabilityStatus}
                        onChange={(e) => setAvailabilityStatus(e.target.value)}
                    >
                        <option value="">Select status</option>
                        <option value="Available">Available</option>
                        <option value="Partially Available">Partially Available</option>
                        <option value="Not Available">Not Available</option>
                    </select>
                </div>

                <div>
                    <label>Available Quantity</label>
                    <input
                        type="number"
                        min="1"
                        value={availableQuantity}
                        onChange={(e) => setAvailableQuantity(e.target.value)}
                        placeholder="Required if partially available"
                        disabled={availabilityStatus !== "Partially Available"}
                    />
                </div>

                <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                    Submit Availability
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
        </div>
    );
}