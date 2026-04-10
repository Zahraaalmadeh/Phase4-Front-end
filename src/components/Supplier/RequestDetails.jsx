import AvailabilityForm from "./AvaliabilityForm";
import DeliveryEstimateForm from "./DeliveryEstimateForm";
import StatusUpdateForm from "./StatusUpdateForm";

export default function RequestDetails({
                                           request,
                                           onSaveAvailability,
                                           onSaveDelivery,
                                           onSaveStatus,
                                       }) {
    if (!request) {
        return (
            <div className="card inner-card">
                <p className="muted">Select a request to view its details.</p>
            </div>
        );
    }

    return (
        <div className="card inner-card">
            <h3>Request Details</h3>

            <p><strong>Request ID:</strong> {request.id}</p>
            <p><strong>Product:</strong> {request.product}</p>
            <p><strong>Quantity:</strong> {request.quantity}</p>
            <p><strong>Department:</strong> {request.department}</p>
            <p><strong>Urgency:</strong> {request.urgency}</p>
            <p><strong>Status:</strong> {request.status}</p>
            <p><strong>Availability:</strong> {request.availabilityStatus || "Not submitted yet"}</p>
            <p><strong>Available Quantity:</strong> {request.availableQuantity ?? "N/A"}</p>
            <p><strong>Estimated Delivery:</strong> {request.estimatedDelivery || "Not provided yet"}</p>
            <p><strong>Tracking Number:</strong> {request.trackingNumber || "N/A"}</p>
            <p><strong>Notes:</strong> {request.deliveryNotes || "No notes added"}</p>

            <div className="detail-actions">
                <AvailabilityForm request={request} onSave={onSaveAvailability} />
                <DeliveryEstimateForm request={request} onSave={onSaveDelivery} />
                <StatusUpdateForm request={request} onSave={onSaveStatus} />
            </div>

            <div className="audit-section">
                <h4>Audit History</h4>
                {request.auditHistory.length === 0 ? (
                    <p className="muted">No audit history yet.</p>
                ) : (
                    <div className="stack">
                        {request.auditHistory.map((item) => (
                            <div key={item.id} className="thread-item">
                                <strong>{item.action}</strong>
                                <small>{item.timestamp}</small>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}