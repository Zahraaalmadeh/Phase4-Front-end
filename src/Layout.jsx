import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "./assets/Logo2.png";
import Bell from "./assets/bell.png";
import HomeIcon from "./assets/home.png";
import Logout from "./assets/logout.png";

function Layout({
                    children,
                    supplierNotifications = [],
                    onOpenSupplierNotification,
                }) {
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);

    const [showNotifications, setShowNotifications] = useState(false);

    const isSupplierPage = location.pathname === "/supplier";

    const unreadCount = useMemo(() => {
        if (!isSupplierPage) return 0;
        return supplierNotifications.filter((item) => item.unread).length;
    }, [isSupplierPage, supplierNotifications]);

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
        if (!isSupplierPage || !onOpenSupplierNotification) return;
        setShowNotifications((prev) => !prev);
    };

    const handleNotificationClick = (notificationId) => {
        if (onOpenSupplierNotification) {
            onOpenSupplierNotification(notificationId);
        }
        setShowNotifications(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("session");
        navigate("/login");
    };

    return (
        <>
            <section className="header">
                <img src={Logo} alt="Logo" className="logo" />

                <div className="actionIcon">
                    <div className="notification-wrapper" ref={dropdownRef}>
                        <img
                            src={Bell}
                            alt="Notifications"
                            className={`icon-img ${isSupplierPage ? "clickable-icon" : ""}`}
                            onClick={handleBellClick}
                        />

                        {isSupplierPage && unreadCount > 0 && (
                            <span className="notification-badge">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
                        )}

                        {isSupplierPage && showNotifications && (
                            <div className="notification-dropdown">
                                <div className="notification-dropdown-header">
                                    <h4>Notifications</h4>
                                </div>

                                <div className="notification-dropdown-list">
                                    {supplierNotifications.length === 0 ? (
                                        <p className="notification-empty">
                                            No notifications assigned to you.
                                        </p>
                                    ) : (
                                        supplierNotifications.map((item) => (
                                            <div
                                                key={item.id}
                                                className={`notification-dropdown-item ${
                                                    item.unread ? "unread" : ""
                                                }`}
                                                onClick={() => handleNotificationClick(item.id)}
                                            >
                                                <strong>
                                                    {item.requestId} - {item.product}
                                                </strong>
                                                <span>Quantity: {item.quantity}</span>
                                                <span>Urgency: {item.urgency}</span>
                                                <span>Date: {item.date}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <img
                        src={HomeIcon}
                        alt="Home"
                        className="icon-img clickable-icon"
                        onClick={() => navigate("/dashboard")}
                    />
                    <img
                        src={Logout}
                        alt="Logout"
                        className="icon-img clickable-icon"
                        onClick={handleLogout}
                    />
                </div>
            </section>

            <div className="container">{children}</div>
        </>
    );
}

export default Layout;