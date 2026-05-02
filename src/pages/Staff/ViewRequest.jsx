import { useState, useEffect } from "react";
import "./App.css";

function ViewRequest() {
  const staff = JSON.parse(localStorage.getItem("staff"));

  const [data, setData] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState("");

  useEffect(() => {
    if (!staff?.staffId) return;

    fetch(`http://localhost:3000/api/requests/my/${staff.staffId}`)
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log("Fetch error:", err));
  }, [staff]);

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.itemName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept
      ? item.department === selectedDept
      : true;

    let matchesStock = true;
    if (stockFilter === "low") matchesStock = item.quantity <= 5;
    if (stockFilter === "high") matchesStock = item.quantity > 5;

    return matchesSearch && matchesDept && matchesStock;
  });

  return (
    <div>
      <h2>View Requests</h2>

      {/* FILTERS */}
      <div className="search-form">
        <select
          className="search-select"
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="">All Departments</option>
          <option value="pharmacy">Pharmacy</option>
          <option value="radiology">Radiology</option>
          <option value="blood_bank">Blood Bank</option>
          <option value="icu">ICU</option>
        </select>

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
        </select>
      </div>

      {/* TABLE */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr key={item._id}>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>{item.priority}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewRequest;