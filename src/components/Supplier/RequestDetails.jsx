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
            <div className="card inner-card request-details-card">
                <div className="empty-state compact">
                    <h3>Select a request</h3>
                    <p>Choose a request from the left side to view full details.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card inner-card request-details-card">
            <div className="request-details-header">
                <div>
                    <span className="section-kicker">Request details</span>
                    <h3>{request.id}</h3>
                </div>

                <span
                    className={`badge ${String(request.status)
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                >
                    {request.status}
                </span>
            </div>

            <div className="request-info-grid">
                <div className="info-box">
                    <span className="info-label">Product</span>
                    <strong>{request.product}</strong>
                </div>

                <div className="info-box">
                    <span className="info-label">Quantity</span>
                    <strong>{request.quantity}</strong>
                </div>

                <div className="info-box">
                    <span className="info-label">Department</span>
                    <strong>{request.department}</strong>
                </div>

                <div className="info-box">
                    <span className="info-label">Urgency</span>
                    <strong>{request.urgency}</strong>
                </div>

                <div className="info-box">
                    <span className="info-label">Availability</span>
                    <strong>{request.availabilityStatus || "Not submitted yet"}</strong>
                </div>

                <div className="info-box">
                    <span className="info-label">Available Quantity</span>
                    <strong>{request.availableQuantity ?? "N/A"}</strong>
                </div>

                <div className="info-box">
                    <span className="info-label">Estimated Delivery</span>
                    <strong>{request.estimatedDelivery || "Not provided yet"}</strong>
                </div>

                <div className="info-box">
                    <span className="info-label">Tracking Number</span>
                    <strong>{request.trackingNumber || "N/A"}</strong>
                </div>
            </div>

            <div className="notes-card">
                <span className="info-label">Delivery Notes</span>
                <p>{request.deliveryNotes || "No delivery notes added yet."}</p>
            </div>

            <div className="detail-actions enhanced-actions">
                <AvailabilityForm request={request} onSave={onSaveAvailability} />
                <DeliveryEstimateForm request={request} onSave={onSaveDelivery} />
                <StatusUpdateForm request={request} onSave={onSaveStatus} />
            </div>

            <div className="audit-section">
                <h4>Audit History</h4>

                {!request.auditHistory || request.auditHistory.length === 0 ? (
                    <p className="muted">No audit history yet.</p>
                ) : (
                    <div className="stack">
                        {request.auditHistory.map((item) => (
                            <div key={item.id} className="thread-item audit-item">
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