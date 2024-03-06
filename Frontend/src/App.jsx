import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Inventory from "./components/Inventory";
import Home from "./components/Home";
import Sales from "./components/Sales";

// App component
function App() {
  // State for login status and staff name
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [staffName, setStaffName] = useState("");

  // Handle login event
  const handleLogin = (name) => {
    setStaffName(name);
    setIsLoggedIn(true);
  };

  // Handle logout event
  const handleLogout = () => {
    setStaffName("");
    setIsLoggedIn(false);
  };

  // Render the App component
  return (
    <div className="flex flex-col h-screen">
      <Router>
        {/* Header component with login/logout handlers and state */}
        <Header
          isLoggedIn={isLoggedIn}
          staffName={staffName}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />

        {/* Routes for the application */}
        <Routes>
          <Route
            path="/"
            element={<Home isLoggedIn={isLoggedIn} staffName={staffName} />}
          />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/sales" element={<Sales />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
