import { useState } from "react";
import './App.css';

function ViewRequest() {
  const initialData = [
    { id: 1, title: "Request for Sodium", number: 40, priority: "Medium", date: "02 05 2026", status: "Pending", department: "ph" },
    { id: 2, title: "Request for AlKP", number: 67, priority: "Urgent", date: "10 05 2026", status: "Approved", department: "r" },
    { id: 3, title: "Request for AlKP", number: 1000, priority: "Low", date: "10 05 2026", status: "Rejected", department: "bb" }
  ];

  const [displayData] = useState(initialData);
  const [selectedDept, setSelectedDept] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState("");

  const filteredData = displayData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesStock = true;
    if (stockFilter === "low") matchesStock = item.number <= 5;
    else if (stockFilter === "high") matchesStock = item.number > 5;
    else if (stockFilter === "expired") matchesStock = false;

    let matchesDept = true;
    if (selectedDept) matchesDept = item.department === selectedDept;

    return matchesSearch && matchesStock && matchesDept;
  });

  return (
    <div>
      <h2>View Requests</h2>

        <div className="search-form">
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
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Number of items</th>
              <th>Priority level</th>
              <th>Request Date</th>
              <th>Request status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.number}</td>
                <td>{item.priority}</td>
                <td>{item.date}</td>
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