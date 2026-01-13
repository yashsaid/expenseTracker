import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/register", form);
      console.log("Signup response:", response.data);
      alert("Signup successful! Please login.");
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      console.error("Error response:", error.response);
      const errorMessage = error.response?.data?.message || error.message || "Signup failed";
      alert(`Signup failed: ${errorMessage}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" className="form-control mb-2" onChange={handleChange} required />
        <input name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="form-control mb-2" onChange={handleChange} required />
        <button className="btn btn-primary">Signup</button>
      </form>
      <p className="mt-3">
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </div>
  );
}

export default Signup;
