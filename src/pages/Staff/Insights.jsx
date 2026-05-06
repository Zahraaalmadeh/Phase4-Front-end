import { useState, useEffect } from 'react';
import './App.css';

function Insights() {

    const [displayData, setDisplayData] = useState([]);
    const [selectedDept, setSelectedDept] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch from backend
    useEffect(() => {
        fetch("http://localhost:3000/api/insights")
            .then(res => res.json())
            .then(data => {

                const formatted = data.map(item => ({
                    id: item.id,
                    title: item.name || "",
                    type: item.type || "N/A",
                    department: item.dept || "",
                    usage: Number(item.Usage ?? item.usage) || 0
                }));

                setDisplayData(formatted);
            })
            .catch(err => console.log("Fetch error:", err));

    }, []);

    // 🔥 Only items with usage > 2000
    const filteredData = displayData
        .filter(item => item.usage > 2000)
        .filter(item => {

            const matchesSearch =
                item.title.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesDept =
                selectedDept ? item.department === selectedDept : true;

            return matchesSearch && matchesDept;
        })
        .sort((a, b) => b.usage - a.usage); // optional but important

    return (
        <div className="insights-container">

            <h2>Insights</h2>
            <p>Frequently Used Items (Usage &gt; 2000)</p>

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
                    onChange={(e) => setSelectedDept(e.target.value)}
                >
                    <option value="">-- Select a Department --</option>
                    <option value="Laboratory">Laboratory</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Radiology">Radiology</option>
                    <option value="Blood Bank">Blood Bank</option>
                    <option value="ICU">ICU</option>
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
                            filteredData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{item.type}</td>
                                    <td>{item.department}</td>
                                    <td>{item.usage}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No items above 2000 usage.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Insights;