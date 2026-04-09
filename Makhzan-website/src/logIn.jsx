import { useState } from "react";
import './App.css';
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const checkCredentials = (user, pass) => {
    if (user === "staff" && pass === "1234") {
      localStorage.setItem("isLoggedIn", "true");
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkCredentials(username, password)) {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };
  return (
    <div className="logInBackground">
    <h1>Welcome to Makhzan</h1>
    <div className="logIn">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input 
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input 
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit" className="submitbtn">Log In</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
    </div>
  );
}

export default LogIn;