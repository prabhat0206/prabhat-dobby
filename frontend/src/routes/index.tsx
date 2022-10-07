import Home from "../pages";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Signup from "../pages/signup";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
