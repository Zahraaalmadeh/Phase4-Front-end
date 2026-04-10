import { useState } from 'react';
import './App.css';

function Insights() {
    const initialData = [
        { id: 1, title: "Potassium –K", type: "Reagent", department: "Laboratory", usage: "50000 items this month" },
        { id: 2, title: "BUN/UREA", type: "Reagent", department: "Laboratory", usage: "10000 items this month" },
        { id: 3, title: "CH Diluent", type: "Reagent", department: "Laboratory", usage: "9000 items this month" }
    ];

    const [displayData] = useState(initialData);
    const [selectedDept, setSelectedDept] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [usageFilter, setUsageFilter] = useState("");

    const filteredData = displayData.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesUsage = true;
        const usageNumber = parseInt(item.usage.replace(/\D/g, ''));
        if (usageFilter === "low") matchesUsage = usageNumber <= 1000;
        else if (usageFilter === "high") matchesUsage = usageNumber > 10000;

        let matchesDept = true;
        if (selectedDept) matchesDept = item.department === selectedDept;

        return matchesSearch && matchesUsage && matchesDept;
    });

    return (
        <div className="insights-container">
            <h2>Insights</h2>
            <p>Frequently Used Items</p>
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
                    value={selectedDept}
                    onChange={(e) => {
                        setSelectedDept(e.target.value);
                        setSearchQuery("");  
                        setUsageFilter("");   
                    }}
                >
                    <option value="">-- Select a Department --</option>
                    <option value="ph">Pharmacy</option>
                    <option value="r">Radiology</option>
                    <option value="bb">Blood Bank</option>
                    <option value="icu">ICU</option>
                </select>

                <select 
                    className="search-select"
                    value={usageFilter}
                    onChange={(e) => setUsageFilter(e.target.value)}
                >
                    <option value="">All Stock</option>
                    <option value="low">low usage (≤1000)</option>
                    <option value="high">High usage (&gt;10000)</option>
                </select>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Department</th>
                            <th>Usage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{item.type}</td>
                                    <td>{item.department}</td>
                                    <td>{item.usage}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No items match your filters.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}   

export default Insights;