import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ManageUsers from "./pages/ManageUsers";
import AddUser from "./pages/AddUser";
import ManageCategories from "./pages/ManageCategories";
import ActivityLogs from "./pages/ActivityLogs";
import ConfigureAlerts from "./pages/ConfigureAlerts";
import ManageNotifications from "./pages/ManageNotifications";
import SupplierPage from "./pages/SupplierPage";
import LogIn from "./logIn.jsx";
import { useEffect } from "react";
import ImDashboard from "./pages/inventory-manager/ipages/im-Dashboard.jsx"
import Inventory from "./pages/inventory-manager/ipages/Inventory.jsx"
import Orders from "./pages/inventory-manager/ipages/Orders.jsx";

function App() {
    const [users, setUsers] = useState([
        { id: 1, name: "John Doe", email: "john@email.com", role: "Admin", status: "Active", phone: "", notes: "" },
        { id: 2, name: "Sarah Ackles", email: "sarah@email.com", role: "Staff", status: "Active", phone: "", notes: "" },
        { id: 3, name: "Ali Hadi", email: "ali@email.com", role: "Manager", status: "Inactive", phone: "", notes: "" },
        { id: 4, name: "Mia Cruz", email: "mia@email.com", role: "Supplier", status: "Active", phone: "", notes: "" },
    ]);

    const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("items");
        return savedItems ? JSON.parse(savedItems) : [];
    });
    useEffect(() => {
      localStorage.setItem("items", JSON.stringify(items));
      }, [items]);
    const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
        return savedOrders ? JSON.parse(savedOrders) : [];
    });
    useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    const [editingUser, setEditingUser] = useState(null);

    const addUser = (newUser) => {
        setUsers((prev) => [...prev, { ...newUser, id: Date.now() }]);
    };

    const updateUser = (updatedUser) => {
        setUsers((prev) =>
            prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        setEditingUser(null);
    };

    const deleteUser = (id) => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
    };

    const startEditUser = (user) => {
        setEditingUser(user);
    };

    const clearEditingUser = () => {
        setEditingUser(null);
    };

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/supplier" element={<SupplierPage />} />
            <Route path="/im-dashboard" element={<ImDashboard items={items}/>} />
            <Route path="/inventory" element={<Inventory items={items} setItems={setItems}/>}/>
            <Route path="/orders" element={<Orders orders={orders} setOrders={setOrders} />} />
         

            <Route
                path="/users"
                element={
                    <ManageUsers
                        users={users}
                        onDeleteUser={deleteUser}
                        onEditUser={startEditUser}
                        onAddUserClick={clearEditingUser}
                    />
                }
            />

            <Route
                path="/add-user"
                element={
                    <AddUser
                        onAddUser={addUser}
                        onUpdateUser={updateUser}
                        editingUser={editingUser}
                        clearEditingUser={clearEditingUser}
                    />
                }
            />

            <Route path="/categories" element={<ManageCategories />} />
            <Route path="/logs" element={<ActivityLogs />} />
            <Route path="/alerts" element={<ConfigureAlerts />} />
            <Route path="/notifications" element={<ManageNotifications />} />
        </Routes>
    );
}

export default App;