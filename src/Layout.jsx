import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./assets/Logo2.png";
import Bell from "./assets/bell.png";
import HomeIcon from "./assets/home.png";
import Logout from "./assets/logout.png";

function getStoredJSON(key, fallbackValue) {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallbackValue;
    } catch (error) {
        console.error(`Invalid JSON in localStorage for key: ${key}`, error);
        return fallbackValue;
    }
}

function Layout({
                    children,
                    notifications = [],
                    onOpenNotification,
                }) {
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);

    const [showNotifications, setShowNotifications] = useState(false);

    const session = getStoredJSON("session", null);
    const role = session?.role;

    const unreadCount = useMemo(() => {
        return notifications.filter((item) => item.unread).length;
    }, [notifications]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowNotifications(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleBellClick = () => {
        setShowNotifications((prev) => !prev);
    };

    const handleNotificationClick = (notificationId) => {
        if (onOpenNotification) {
            onOpenNotification(notificationId);
        }
        setShowNotifications(false);
    };

    const handleHomeClick = () => {
        if (!session) {
            navigate("/login");
            return;
        }

        if (role === "admin") {
            navigate("/dashboard");
        } else if (role === "staff") {
            navigate("/staffDashboard");
        } else if (role === "supplier") {
            navigate("/supplier");
        } else {
            navigate("/");
        }
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");

        if (confirmLogout) {
            localStorage.removeItem("session");
            navigate("/login");
        }
    };

    return (
        <>
            <section className="header">
                <img src={Logo} alt="Logo" className="logo" />

                <div className="actionIcon">
                    <div className="notification-wrapper" ref={dropdownRef}>
                        <button
                            type="button"
                            className="header-icon-button"
                            onClick={handleBellClick}
                            aria-label="Notifications"
                        >
                            <img src={Bell} alt="Notifications" className="icon-img" />
                            {unreadCount > 0 && (
                                <span className="notification-badge">
                                    {unreadCount > 99 ? "99+" : unreadCount}
                                </span>
                            )}
                        </button>

                        {showNotifications && (
                            <div className="notification-popover">
                                <div className="notification-popover-header">
                                    <div>
                                        <h4>Notifications</h4>
                                        <p>
                                            {notifications.length} item
                                            {notifications.length !== 1 ? "s" : ""}
                                        </p>
                                    </div>
                                </div>

                                <div className="notification-popover-list">
                                    {notifications.length === 0 ? (
                                        <div className="notification-empty-card">
                                            <strong>No notifications</strong>
                                            <p>No notifications assigned to you.</p>
                                        </div>
                                    ) : (
                                        notifications.map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                className={`notification-popover-item ${
                                                    item.unread ? "unread" : ""
                                                }`}
                                                onClick={() => handleNotificationClick(item.id)}
                                            >
                                                <div className="notification-item-top">
                                                    <strong>{item.product || item.title}</strong>
                                                    <span className="notification-request-id">
                                                        {item.requestId || item.id}
                                                    </span>
                                                </div>

                                                <div className="notification-meta">
                                                    {item.quantity && <span>Qty: {item.quantity}</span>}
                                                    {item.urgency && <span>{item.urgency}</span>}
                                                    {item.date && <span>{item.date}</span>}
                                                </div>
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        className="header-icon-button"
                        onClick={handleHomeClick}
                        aria-label="Home"
                    >
                        <img src={HomeIcon} alt="Home" className="icon-img" />
                    </button>

                    <button
                        type="button"
                        className="header-icon-button"
                        onClick={handleLogout}
                        aria-label="Logout"
                    >
                        <img src={Logout} alt="Logout" className="icon-img" />
                    </button>
                </div>
            </section>

            <div className="container">{children}</div>
        </>
    );
}

export default Layout;