import React from "react";

export default function Toast({ show = false, message = "", onClose, duration = 3000 }) {
  React.useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(t);
  }, [show, duration, onClose]);

  if (!show) return null;
  return (
    <div style={{
      position: "fixed",
      right: 20,
      bottom: 20,
      background: "linear-gradient(90deg,var(--primary-500),var(--accent-500))",
      color: "#fff",
      padding: "10px 14px",
      borderRadius: 10,
      boxShadow: "0 10px 30px rgba(15,23,42,0.18)",
      zIndex: 9999,
      minWidth: 220,
      fontWeight: 600
    }}>
      {message}
    </div>
  );
}
