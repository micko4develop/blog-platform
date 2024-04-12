 
import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch("http://127.0.0.1:3001/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          // Call onLogin callback to set isLoggedIn to true in App.js
          onLogin();
        } else {
          alert("Invalid credentials. Please try again.");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div>
      <h1>Login Form</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button> <br />
      <a href="/registration">Go to registration form</a>
    </div>
  );
};

export default Login;