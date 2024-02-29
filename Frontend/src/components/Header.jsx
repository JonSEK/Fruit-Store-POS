import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [staffName, setStaffName] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleLogin = (name) => {
    setStaffName(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setStaffName("");
    setIsLoggedIn(false);
  };

  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-3xl">Staff: {isLoggedIn ? staffName : "Guest"}</h1>
      <p className="text-3xl">Time: {currentTime.toLocaleTimeString()}</p>
      <nav>
        <Link to="/inventory" className="text-blue-500 hover:text-blue-800">
          Inventory
        </Link>
      </nav>
      <Login
        onLogin={handleLogin}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
      />
    </header>
  );
}

export default Header;
