import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Connection from "../pages/Connection";
import Home from "../pages/Home"
import Navbar from "../components/Navbar";


const index = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Connection />} />
        <Route path="/home" element={<Home />} />
        <Route
            path="/redirect"
            element={ <Navigate to="/" /> }
        />
      </Routes>
    </Router>
  );
};

export default index;