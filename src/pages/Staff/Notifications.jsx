import React, { useState, useEffect } from 'react';
import './App.css'; 


const initialNotifications = [
  { id: 1, message: "Your request has been accepted", isRead: false },
  { id: 2, message: "10 items are left of Normal Saline", isRead: true }
];

function Notifications() {
    const [notifications, setNotifications] = useState(() => {
      const saved = localStorage.getItem("notifications");
      return saved ? JSON.parse(saved) : initialNotifications;
    });

    useEffect(() => {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    }, [notifications]);
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <>
      <h2>Notifications</h2>
      <div className="notifications-container">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={n.isRead ? "notification read" : "notification unread"}
            onClick={() => markAsRead(n.id)}
          >
            {n.message}
            {!n.isRead && <span className="unread-dot">•</span>}
          </div>
        ))}
      </div>
    </>
  );
}

export default Notifications;