import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Home, FileText, BarChart2, Settings } from "lucide-react";

export default function Sidebar({ collapsed }) {
  const { user } = useAuth();
  if (!user) return null;

  const baseClass = "sidebar";
  const fullClass =
    baseClass + (collapsed ? " sidebar--collapsed" : "");

  if (user.role === "admin") {
    return (
      <aside className={fullClass} role="navigation" aria-label="Admin">
        <NavLink to="/admin/dashboard" className="navlink">
          <Home size={18} />
          {!collapsed && "Dashboard"}
        </NavLink>

        <NavLink to="/admin/manage" className="navlink">
          <Settings size={18} />
          {!collapsed && "Manage"}
        </NavLink>

        <NavLink to="/admin/results" className="navlink">
          <BarChart2 size={18} />
          {!collapsed && "Results"}
        </NavLink>
      </aside>
    );
  }

  return (
    <aside className={fullClass} role="navigation" aria-label="User">
      <NavLink to="/user/dashboard" className="navlink">
        <Home size={18} />
        {!collapsed && "Dashboard"}
      </NavLink>

      <NavLink to="/user/feedback" className="navlink">
        <FileText size={18} />
        {!collapsed && "Feedback"}
      </NavLink>
    </aside>
  );
}