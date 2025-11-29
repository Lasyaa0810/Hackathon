import React from "react";

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(12,17,24,0.4)", display: "flex",
      alignItems: "center", justifyContent: "center", zIndex: 2000
    }}>
      <div style={{ width: 700, maxWidth: "95%", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: "white", padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: 700 }}>{title}</div>
            <button onClick={onClose} className="btn">Close</button>
          </div>
          <div style={{ marginTop: 12 }}>{children}</div>
        </div>
      </div>
    </div>
  );
}
