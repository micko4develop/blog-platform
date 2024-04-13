import React, { useState } from "react";

const Registration = ({ onRegistration }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async () => { 
    
    try { 
        
        const response = await fetch("http://127.0.0.1:3001/api/users", { 
            method: "POST", headers: { "Content-Type": "application/json", }, 
            body: JSON.stringify({ firstName, lastName, email, password, }), 
        });

 
  if (response.ok) {
    // Registration successful, redirect or display a success message

    await fetch("http://127.0.0.1:3001/api/auth", {
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
            onRegistration();
            navigator("/")
          } else {
            alert("Invalid credentials. Please try again.");
          }
        })
        .catch(error => {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
        });
  } else {
    // Handle registration error, display an error message
    alert("Registration failed");
  }
} catch (error) {
  // Handle any network or server error
  alert("An error occurred:", error);
}
};

  return (
    <div>
      <h1>Registration Form</h1>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
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
      <button onClick={handleRegistration}>Register</button> <br />
      <a href="/">Back to login form</a>
    </div>
  );
};

export default Registration;