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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background:
          "radial-gradient(circle at top left, #bbf7d0 0, #f0fdf4 40%, #ecfeff 100%)",
        padding: 20,
        position: "relative",
      }}
    >
      <form
        onSubmit={handleSignup}
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 28,
          background: "rgba(255,255,255,0.96)",
          borderRadius: 18,
          backdropFilter: "blur(12px)",
          boxShadow: "0 24px 45px rgba(22,163,74,0.18)",
          marginTop: 80,
          border: "1px solid rgba(148,163,184,0.35)",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 18,
            textAlign: "center",
            color: "#064e3b",
          }}
        >
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

        <Button variant="primary" type="submit" style={{ width: "100%", marginTop: 8, borderRadius: 999 }}>Sign Up</Button>

        <div style={{ textAlign: "center", marginTop: 12 }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              marginLeft: 6,
              color: "#047857",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
