import React from "react";

export default function FormRow({ label, children }) {
  return (
    <div className="form-row">
      <div className="label">{label}</div>
      <div>{children}</div>
    </div>
  );
}
