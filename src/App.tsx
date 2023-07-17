import React from "react";
import { Routes, Route } from "react-router-dom";
import Videos from "./pages/Videos";
import More from "./pages/More";
import Channels from "./pages/Channels";
import Games from "./pages/Games";
import Followed from "./pages/Followed";
import Clips from "./pages/Clips";
import User from "./pages/User";
import UserSettings from "./pages/UserSettings";

export default function App() {
  return (
    <Routes>
      <Route index element={<Channels />} />
      <Route path="/Channels" element={<Channels />} />
      <Route path="/Games" element={<Games />} />
      <Route path="/Followed" element={<Followed />} />
      <Route path="/Clips" element={<Clips />} />
      <Route path="/Channels" element={<Channels />} />
      <Route path="/Videos" element={<Videos />} />
      <Route path="/More" element={<More />} />
      <Route path="/User_Settings" element={<UserSettings />} />
      <Route path="*" element={<User username={window.location.href} />} />
    </Routes>
  );
}
