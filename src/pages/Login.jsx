import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import "../styles/layout.css";

export default function Login() {
  React.useEffect(() => {
    generateCaptcha();
  }, []);

  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptcha(code);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (captchaInput !== captcha) {
      setError("Captcha incorrect!");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

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
          "radial-gradient(circle at top left, #bbf7d0 0, #f0fdf4 40%, #ecfeff 100%)",
        padding: 20,
        position: "relative",
      }}
    >
      {}
      <div
        style={{
          position: "absolute",
          top: 40,
          width: "100%",
          textAlign: "center",
          color: "#064e3b",
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          textShadow: "0 10px 30px rgba(22,163,74,0.18)",
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

        <div className="form-row" style={{ marginTop: 10 }}>
          <div className="label">Captcha</div>

          <div
            style={{
              background: "#064e3b",
              color: "white",
              fontWeight: 700,
              width: "140px",
              textAlign: "center",
              letterSpacing: "4px",
              padding: "8px",
              borderRadius: "6px",
              fontSize: "16px",
              userSelect: "none",
              marginBottom: "8px",
            }}
          >
            {captcha}
          </div>

          <input
            className="input"
            placeholder="Enter captcha"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            required
          />

          <button
            type="button"
            className="btn btn-ghost"
            onClick={generateCaptcha}
            style={{ marginTop: "6px", fontSize: "12px", padding: "4px 8px" }}
          >
            Refresh 🔄
          </button>
        </div>

        <Button
          type="submit"
          variant="accent"
          style={{
            width: "100%",
            marginTop: 8,
            borderRadius: 999,
            background: "linear-gradient(90deg, #059669, #10b981, #22c55e)",
            color: "white",
            fontWeight: 700,
            boxShadow: "0 14px 30px rgba(16,185,129,0.35)",
            border: "none",
          }}
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
                color: "#047857",
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