import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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

function Layout({ children, onOpenNotification }) {
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const [showNotifications, setShowNotifications] = useState(false);
    const [fetchedNotifications, setFetchedNotifications] = useState([]);

    const session = getStoredJSON("staff", null);
    const role = session?.role;

    useEffect(() => {
        fetch("http://localhost:3000/api/admin/notifications")
            .then((r) => r.json())
            .then((data) => {
                if (!Array.isArray(data)) return;
                const filtered = data.filter(
                    (n) => n.isActive && (n.targetRole === "all" || n.targetRole === role)
                );
                setFetchedNotifications(filtered);
            })
            .catch(() => {});
    }, [role]);

    const unreadCount = fetchedNotifications.length;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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

        if (role === "admin") {
            navigate("/dashboard");
        } else if (role === "staff") {
            navigate("/staffDashboard");
        } else if (role === "supplier") {
            navigate("/supplier");
        } else if (role === "manager") {
            navigate("/im-dashboard");
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
                                            {fetchedNotifications.length} item
                                            {fetchedNotifications.length !== 1 ? "s" : ""}
                                        </p>
                                    </div>
                                </div>

                                <div className="notification-popover-list">
                                    {fetchedNotifications.length === 0 ? (
                                        <div className="notification-empty-card">
                                            <strong>No notifications</strong>
                                            <p>No notifications assigned to you.</p>
                                        </div>
                                    ) : (
                                        fetchedNotifications.map((item) => (
                                            <button
                                                key={item._id}
                                                type="button"
                                                className="notification-popover-item"
                                                onClick={() => handleNotificationClick(item._id)}
                                            >
                                                <div className="notification-item-top">
                                                    <strong>{item.title}</strong>
                                                    <span className="notification-request-id">
                                                        {item.type}
                                                    </span>
                                                </div>
                                                <div className="notification-meta">
                                                    {item.message && <span>{item.message}</span>}
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