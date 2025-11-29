import React from "react";

export default function Button({ children, variant = "primary", onClick, type = "button", style }) {
  const cls = variant === "primary" ? "btn btn-primary" : variant === "accent" ? "btn btn-accent" : "btn btn-ghost";
  return (
    <button type={type} className={cls} onClick={onClick} style={style}>
      {children}
    </button>
  );
}
