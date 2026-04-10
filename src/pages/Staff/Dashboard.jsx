import './App.css';
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="Dashboard-container">
        <div className="box"
        onClick={() => navigate("/add-request")}>   
        <h3>Add new request</h3>
        </div>

        <div className="box"     
        onClick={() => navigate("/inventory")}>
        <h3>View inventory</h3>
        </div>

        <div className="box"
        onClick={() => navigate("/Insights")}>
       <h3>View insights</h3>
        </div>

        <div className="box"
        onClick={() => navigate("/view-requests")}>   

        <h3>View requests</h3>
        </div>
    </div>
  );
}

export default Dashboard;