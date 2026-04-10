import { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const users = [
    {
      username: "staff",
      password: "1234",
      role: "staff",
      email: "staff@makhzan.com",
      active: true,
    },
    {
      username: "supplier01",
      password: "1234",
      role: "supplier",
      email: "supplier@makhzan.com",
      active: true,
    },
    {
  username: "admin",
  password: "1234",
  role: "admin",
  email: "admin@makhzan.com",
  active: true,
},
    {username:"manager",
    password:"1234",
    role:"Manager",
    email:"manager@makhzan.com",
    active:true,
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundUser = users.find(
        (user) =>
            (user.username === username || user.email === username) &&
            user.password === password
    );

    if (!foundUser) {
      setError("Invalid username or password");
      return;
    }

    if (!foundUser.active) {
      setError("Account is inactive");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem(
        "session",
        JSON.stringify({
          username: foundUser.username,
          email: foundUser.email,
          role: foundUser.role,
        })
    );

    setError("");

    if (foundUser.role === "admin") {
      navigate("/dashboard"); // admin dashboard
    } else if (foundUser.role === "staff") {
      navigate("/dashboard");
    } else if (foundUser.role === "supplier") {
      navigate("/supplier");
    } else {
      navigate("/");
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