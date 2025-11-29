import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div className="brand">
          <div className="logo">SF</div>
          <div>
            <div style={{ fontFamily: "Poppins, Inter", fontSize: 16, fontWeight: 700, color: "var(--primary-700)" }}>Student Feedback</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Collect feedback & insights</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {user && <div style={{ textAlign: "right", marginRight: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--primary-700)" }}>{user.name}</div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>{user.role}</div>
        </div>}
        <button className="btn btn-ghost" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}
