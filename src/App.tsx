import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/App";
import React from "react";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  );
};

export default App;
