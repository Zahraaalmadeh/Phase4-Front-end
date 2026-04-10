import React, { useState } from 'react';
import './App.css';

function Inventory() {
  const initialData = [
    { id: 1, name: "Saline Solution", stock: 23, expiry: "Aug 12, 2024", dept: "icu", icon: "💧"},
    { id: 2, name: "Epinephrine", stock: 5, expiry: "Jun 18, 2023", dept: "ph", icon: "💧", note: "Low stock alert"},
    { id: 3, name: "Antibiotic Tablets", stock: 25, expiry: "Jul 18, 2023", dept: "ph", icon: "💊" },
    { id: 4, name: "Blood Bags", stock: 2, expiry: "Expired", dept: "bb", icon: "🩸", note: "Expiration alert"},
  ];

  const [selectedDept, setSelectedDept] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState("");

  const displayData = initialData.filter(item => {
    return (
      (selectedDept === "" || item.dept === selectedDept) &&
      (searchQuery === "" || item.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (stockFilter === "" ||
        (stockFilter === "low" && item.stock <= 5) ||
        (stockFilter === "high" && item.stock > 5) ||
        (stockFilter === "expired" && item.expiry === "Expired")
      )
    );
  });

  const notes = displayData.filter(item => item.note);

  return (
    <div className="inventory">

    {selectedDept !== "" && (
      <div className="notes-container">
        {notes.length > 0 ? (
          notes.map(item => (
            <div key={item.id} className="note">
              ⚠️ {item.note} - {item.name}
            </div>
          ))
        ) : (
          <p>No alerts</p>
        )}
      </div>
    )}

      <div className="filter-section">
        <select 
          className="search-select" 
          value={selectedDept}
          onChange={(e) => {
            setSelectedDept(e.target.value);
            setSearchQuery("");  
            setStockFilter("");   
          }}
        >
          <option value="">-- Select a Department --</option>
          <option value="ph">Pharmacy</option>
          <option value="r">Radiology</option>
          <option value="bb">Blood Bank</option>
          <option value="icu">ICU</option>
        </select>

        {selectedDept !== "" && (
          <>
            <div className="search-form">
              <input 
                type="text" 
                placeholder="Search..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} 
              />

              <select 
                className="search-select"
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
              >
                <option value="">All Stock</option>
                <option value="low">Low Stock (≤ 5)</option>
                <option value="high">High Stock (&gt; 5)</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </>
        )}
      </div>

      {selectedDept !== "" ? (
        displayData.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Stock</th>
                  <th>Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span className="icon">{item.icon}</span> {item.name}
                    </td>
                    <td className="stock-val">{item.stock}</td>
                    <td>{item.expiry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No items match your filters.</p>
        )
      ) : (
        <p>Please select a department first.</p>
      )}
    </div>
  );
}

export default Inventory;