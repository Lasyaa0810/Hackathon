import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import "../styles/layout.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }

    const res = login(username.trim(), password.trim());
    if (res.success) {
      if (res.role === "admin") navigate("/admin/dashboard");
      else navigate("/user/dashboard");
    } else {
      setError(res.message || "Login failed");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background:
          "linear-gradient(135deg, var(--primary-500), var(--accent-500))",
        padding: 20,
        position: "relative",
      }}
    >
      {/* 🌟 PROJECT TITLE  */}
      <div
        style={{
          position: "absolute",
          top: 40,
          width: "100%",
          textAlign: "center",
          color: "white",
          fontSize: 32,
          fontWeight: 800,
          letterSpacing: "0.6px",
          textShadow: "0 4px 14px rgba(0,0,0,0.3)",
          textTransform: "uppercase",
        }}
      >
        STUDENT FEEDBACK & EVALUATION SYSTEM
      </div>

      {/* LOGIN CARD */}
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 30,
          background: "rgba(255,255,255,0.92)",
          borderRadius: 16,
          backdropFilter: "blur(6px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          marginTop: 80,
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            marginBottom: 18,
            textAlign: "center",
            color: "var(--primary-700)",
          }}
        >
          Login
        </div>

        {error && (
          <div style={{ color: "#b91c1c", marginBottom: 12, fontSize: 14 }}>
            {error}
          </div>
        )}

        <div className="form-row">
          <div className="label">Username</div>
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="label">Password</div>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          variant="accent"
          style={{ width: "100%", marginTop: 8 }}
        >
          Login
        </Button>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 14,
          }}
        >
          <div style={{ fontSize: 14, color: "var(--muted)" }}>
            Don’t have an account?
            <Link
              to="/signup"
              style={{
                marginLeft: 8,
                color: "var(--primary-700)",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Create one
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
