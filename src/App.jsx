import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import ManageUsers from "./pages/ManageUsers";
import AddUser from "./pages/AddUser";
import ManageCategories from "./pages/ManageCategories";
import ActivityLogs from "./pages/ActivityLogs";
import ConfigureAlerts from "./pages/ConfigureAlerts";
import ManageNotifications from "./pages/ManageNotifications";

function App() {
  const [page, setPage] = useState("dashboard");

  if (page === "dashboard") {
    return <Dashboard setPage={setPage} currentPage={page} />;
  }

  if (page === "users") {
    return <ManageUsers setPage={setPage} currentPage={page} />;
  }

  if (page === "add-user") {
    return <AddUser setPage={setPage} currentPage={page} />;
  }
  if (page === "categories") {
  return <ManageCategories setPage={setPage} currentPage={page} />;
}
if (page === "logs") {
  return <ActivityLogs setPage={setPage} currentPage={page} />;
}
if (page === "alerts") {
  return <ConfigureAlerts setPage={setPage} currentPage={page} />;
}
if (page === "notifications") {
  return <ManageNotifications setPage={setPage} currentPage={page} />;
}

  return <Dashboard setPage={setPage} currentPage={page} />;
}

export default App;