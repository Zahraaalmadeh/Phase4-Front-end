function getBadgeClass(status) {
    return String(status).toLowerCase().replace(/\s+/g, "-");
}

export default function RequestList({ requests, selectedRequestId, onSelect }) {
    return (
        <div className="stack">
            {requests.length === 0 ? (
                <p className="muted">No assigned requests found.</p>
            ) : (
                requests.map((request) => (
                    <div
                        key={request.id}
                        className={`request-item ${
                            selectedRequestId === request.id ? "selected-card" : ""
                        }`}
                    >
                        <strong>
                            {request.id} - {request.product}
                        </strong>
                        <p>Department: {request.department}</p>
                        <p>Quantity: {request.quantity}</p>
                        <p>Urgency: {request.urgency}</p>
                        <p>Request Date: {request.requestDate}</p>

                        <span className={`badge ${getBadgeClass(request.status)}`}>
              {request.status}
            </span>

                        <div className="item-actions">
                            <button className="btn btn-outline" onClick={() => onSelect(request.id)}>
                                Open
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}