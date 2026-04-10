export default function NotificationList({ notifications, onOpenNotification }) {
    return (
        <div className="card panel-card">
            <div className="section-header">
                <h2>Supply Notifications</h2>
            </div>

            <div className="stack">
                {notifications.length === 0 ? (
                    <p className="muted">No notifications assigned to you.</p>
                ) : (
                    notifications.map((item) => (
                        <div
                            key={item.id}
                            className={`notification-item ${item.unread ? "unread" : ""}`}
                        >
                            <strong>
                                {item.requestId} - {item.product}
                            </strong>
                            <p>Quantity: {item.quantity}</p>
                            <p>Urgency: {item.urgency}</p>
                            <p>Date: {item.date}</p>

                            <button
                                className="btn btn-outline"
                                onClick={() => onOpenNotification(item.id)}
                            >
                                View Request
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}