import React from "react";

export default function Card({ title, children, style }) {
  return (
    <section className="card" style={style}>
      {title && <div className="card-title">{title}</div>}
      {children}
    </section>
  );
}
