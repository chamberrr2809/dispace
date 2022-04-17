import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/App";
import Auth from "./pages/auth/App";
import React from "react";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/home/App";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/app" element={<Home />} />
    </Routes>
  );
};

export default App;
