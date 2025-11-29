import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("fedf_user")) || null;
  });

  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("fedf_users")) || [];
  });

  useEffect(() => {
    localStorage.setItem("fedf_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("fedf_users", JSON.stringify(users));
  }, [users]);

  function signup(username, password, role = "user") {
    const exists = users.find((u) => u.username === username);
    if (exists) {
      return { success: false, message: "Username already exists" };
    }
    const newUser = { username, password, role };
    setUsers((prev) => [...prev, newUser]);
    setUser({ name: username, role });
    return { success: true };
  }

  function login(username, password) {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser({ name: found.username, role: found.role || "user" });
      return { success: true, role: found.role || "user" };
    }
    return { success: false, message: "Incorrect username or password" };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
