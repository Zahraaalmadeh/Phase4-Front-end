import { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username.trim(),
        password: password.trim()
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Login failed");
      return;
    }

    // save session
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("staff", JSON.stringify(data));
    localStorage.setItem("session", JSON.stringify(data));
    setError("");

    // navigation based on role
    if (data.role === "admin") {
      navigate("/dashboard");
    } else if (data.role === "staff") {
      navigate("/staffDashboard");
    } else if (data.role === "supplier") {
      navigate("/supplier");
    } else if (data.role === "manager") {
      navigate("/im-dashboard");
    } else {
      navigate("/");
    }

  } catch (err) {
    setError("Server error");
  }
};

  return (
      <div className="logInBackground">
        <h1>Welcome to Makhzan</h1>
        <div className="logIn">
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username / Email:</label>
            <input
                type="text"
                id="username"
                placeholder="Username or email"
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

            <button type="submit" className="submitbtn">
              Log In
            </button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
  );
}

export default LogIn;