import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Inventory from "./components/Inventory";
import Home from "./components/Home";
import Sales from "./components/Sales";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [staffName, setStaffName] = useState("");

  const handleLogin = (name) => {
    setStaffName(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setStaffName("");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Header
        isLoggedIn={isLoggedIn}
        staffName={staffName}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      <Routes>
        <Route
          path="/"
          element={<Home isLoggedIn={isLoggedIn} staffName={staffName} />}
        />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/sales" element={<Sales />} />
      </Routes>
    </Router>
  );
}

export default App;
