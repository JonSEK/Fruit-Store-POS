import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Login from "./Login";

function Header({ isLoggedIn, staffName, onLogin, onLogout }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const location = useLocation();
  const isInventoryPage = location.pathname === "/inventory";

  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-3xl">Staff: {isLoggedIn ? staffName : "Guest"}</h1>
      <p className="text-3xl">
        {currentTime.toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })}
      </p>
      <nav>
        <Link
          to={isInventoryPage ? "/" : "/inventory"}
          className="text-blue-500 hover:text-blue-800"
        >
          {isInventoryPage ? "Home" : "Inventory"}
        </Link>
      </nav>
      <Login
        onLogin={onLogin}
        onLogout={onLogout}
        isLoggedIn={isLoggedIn}
      />
    </header>
  );
}

export default Header;