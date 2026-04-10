import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./ipages/im-Dashboard";
import Inventory from "./ipages/Inventory";
import Orders from "./ipages/Orders";
import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState(() => {
  const savedItems = localStorage.getItem("items");
  return savedItems ? JSON.parse(savedItems) : [];
  });
  const [orders, setOrders] = useState(() => {
  const savedOrders = localStorage.getItem("orders");
  return savedOrders ? JSON.parse(savedOrders) : [];
  });
  useEffect(() => {
  localStorage.setItem("items", JSON.stringify(items));
  }, [items]);
  useEffect(() => {
  localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/inventory" element={<Inventory items={items} setItems={setItems}/>}/>
      <Route path="/orders" element={<Orders orders={orders} setOrders={setOrders} />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App
