import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard"; 
import Student from "./pages/Student";
import Admin from "./pages/Admin";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import "./styles/layout.css";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

export default function App() {
  return (
    <div className="app-root">
      <Routes>
        {}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <>
                <Header />
                <div className="app-body">
                  <Sidebar />
                  <main className="main-content container">
                    <Routes>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="manage" element={<Admin />} />
                      <Route path="results" element={<Results />} />
                      <Route path="" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </main>
                </div>
              </>
            </ProtectedRoute>
          }
        />

        {}
        <Route
          path="/user/*"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <>
                <Header />
                <div className="app-body">
                  <Sidebar />
                  <main className="main-content container">
                    <Routes>
                      <Route path="dashboard" element={<UserDashboard />} />
                      <Route path="feedback" element={<Student />} />
                      <Route path="" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </main>
                </div>
              </>
            </ProtectedRoute>
          }
        />

        {}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}
