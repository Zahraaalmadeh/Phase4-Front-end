import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Dashboard";  
import AddRequest from "./AddRequest";
import Inventory from "./inventory"; 
import LogIn from "./logIn";   
import Notifications from "./Notifications";
import ViewRequest from "./ViewRequest";
import Insights from "./Insights";
  

function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<LogIn />} />     
        <Route path="/inventory" element={<Layout><Inventory /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/add-request" element={<Layout><AddRequest /></Layout>} />
        <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
        <Route path="/view-requests" element={<Layout><ViewRequest /></Layout>} />
        <Route path="/Insights" element={<Layout><Insights /></Layout>} />
        <Route path="/login" element={<LogIn />} />

        </Routes>
    </BrowserRouter>
  );
}

export default App;