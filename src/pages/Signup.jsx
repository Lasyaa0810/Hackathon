import React, { useState } from "react";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/layout.css";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  function handleSignup(e) {
    e.preventDefault();
    setError("");
    const res = signup(username.trim(), password.trim(), role);
    if (!res.success) {
      setError(res.message);
      return;
    }
    if (role === "admin") navigate("/admin/dashboard");
    else navigate("/user/dashboard");
  }

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center", height: "100vh",
      background: "linear-gradient(135deg, var(--primary-500), var(--accent-500))", padding: 20
    }}>
      <form onSubmit={handleSignup} style={{
        width: "100%", maxWidth: 420, padding: 30, background: "rgba(255,255,255,0.95)",
        borderRadius: 16, backdropFilter: "blur(6px)", boxShadow: "0 10px 30px rgba(0,0,0,0.12)"
      }}>
        <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 18, textAlign: "center", color: "var(--primary-700)" }}>
          Create Account
        </div>

        {error && <div style={{ color: "#b91c1c", marginBottom: 12 }}>{error}</div>}

        <div className="form-row">
          <div className="label">Username</div>
          <input className="input" value={username} onChange={e => setUsername(e.target.value)} />
        </div>

        <div className="form-row">
          <div className="label">Password</div>
          <input type="password" className="input" value={password} onChange={e => setPassword(e.target.value)} />
        </div>

        <div className="form-row">
          <div className="label">Role</div>
          <select className="input" value={role} onChange={e => setRole(e.target.value)}>
            <option value="user">Student / User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <Button variant="primary" type="submit" style={{ width: "100%", marginTop: 8 }}>Sign Up</Button>

        <div style={{ textAlign: "center", marginTop: 12 }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
