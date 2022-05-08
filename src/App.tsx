import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/App";
import Auth from "./pages/auth/App";
import React from "react";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/home/App";
import { useToken } from "react-firebase-hooks/messaging";
import { messaging } from "./firebase";
import AppActivity from "./pages/home/AppActivity";
import List from "./pages/home/List";
import Onboarding from "./pages/auth/Onboarding";
import DirectMessages from "./pages/home/DirectMessages";
import FriendList from "./pages/home/FriendList";
import Join from "./pages/Join";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/app" element={<List />} />
      <Route path="/app/activity/@me" element={<AppActivity />} />
      <Route path="/app/messages/@me" element={<DirectMessages />} />
      <Route path="/app/friends/@me" element={<FriendList />} />
      <Route path="/join" element={<Join />} />
      {/* <Route path="/app" element={<Home />} /> */}
    </Routes>
  );
};

function GetToken() {
  const [token, loading, error] = useToken(
    messaging,
    "BOxslUdMmMPP-SrJOisG0OHwLnxDWkEDOatDQcvsdxiDeGynPUqrZbVhlp0axx45OqoQ4d_cVG_DEXRgNT_QWAY"
  );
  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading token...</span>}
        {token && <span>Token:{token}</span>}
      </p>
    </div>
  );
}

export default App;
