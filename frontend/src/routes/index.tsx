import Home from "../pages";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/login";
import Signup from "../pages/signup";
import { useContext } from "react";
import { Store } from "../context";
import Index from "../pages/home";
import Search from "../pages/home/search";

export default function Router() {
  const { user } = useContext(Store);
  return (
    <Routes>
      <Route
        path="/"
        element={user.isAuthenticated ? <Home /> : <Navigate to={"/login"} />}
      >
        <Route path="/" element={<Index />} />
        <Route path="/search" element={<Search />} />
      </Route>
      <Route
        path="/login"
        element={user.isAuthenticated ? <Navigate to={"/"} /> : <Login />}
      />
      <Route
        path="/signup"
        element={user.isAuthenticated ? <Navigate to={"/"} /> : <Signup />}
      />
    </Routes>
  );
}
