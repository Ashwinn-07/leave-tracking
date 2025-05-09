import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
