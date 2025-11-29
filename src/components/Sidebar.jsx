import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Home, FileText, BarChart2, Settings } from "lucide-react";

export default function Sidebar() {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === "admin") {
    return (
      <aside className="sidebar" role="navigation" aria-label="Admin">
        <NavLink to="/admin/dashboard" className="navlink"><Home size={16} />Dashboard</NavLink>
        <NavLink to="/admin/manage" className="navlink"><Settings size={16} />Manage</NavLink>
        <NavLink to="/admin/results" className="navlink"><BarChart2 size={16} />Results</NavLink>
      </aside>
    );
  }

  return (
    <aside className="sidebar" role="navigation" aria-label="User">
      <NavLink to="/user/dashboard" className="navlink"><Home size={16} />Dashboard</NavLink>
      <NavLink to="/user/feedback" className="navlink"><FileText size={16} />Feedback</NavLink>
    </aside>
  );
}
