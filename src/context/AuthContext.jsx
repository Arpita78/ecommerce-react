import { createContext, useState, useContext } from "react";
//import { useState } from "react";
const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem("currentUserEmail") ? JSON.parse(localStorage.getItem("currentUserEmail")) : null );

    function signUp(email, password) {
      //This will check whether the User logged in or not if exist then it will return current user email else it will return null
        const users = JSON.parse(localStorage.getItem("currentUserEmail") || "[]");
        if (users.find((u) => u.email === email)) {
            return { success: false, error: "Email already exists" };
        }
        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        setUser({ email });
        localStorage.setItem('currentUserEmail', JSON.stringify({ email }));
        return { success: true };
    }    

    function login(email, password) {      
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
            setUser({ email });
            return { success: true };
        } else {
            return { success: false, error: "Invalid email or password" };
        }
    }

    function logout() {
      localStorage.removeItem("currentUserEmail")
      setUser(null);
    }
    
  return (
    <AuthContext.Provider value={{ signUp, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}