import { useState } from "react";
import api from "../api/axios";
import './Register.css'

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADVISOR"
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await api.post("/auth/register", form);
      alert("User registered successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ padding: 40 }} className="register-container">
      <h2>Register User</h2>

      <input name="name" placeholder="Name" onChange={handleChange} /><br /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br /><br />

      <select name="role" onChange={handleChange}>
        <option value="ADVISOR">Service Advisor</option>
        <option value="TECHNICIAN">Technician</option>
        <option value="CASHIER">Cashier</option>
        <option value="MANAGER">Manager</option>
      </select><br /><br />

      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}
