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
  const isSalesPage = location.pathname === "/sales";

  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-2xl">Staff: {isLoggedIn ? staffName : "Guest"}</h1>
      <p className="text-2xl">
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

      <Link
        to={isInventoryPage ? "/" : "/inventory"}
        className="text-blue-500 hover:text-blue-800"
      >
        {isInventoryPage ? "Home" : "Inventory"}
      </Link>
      <Link
        to={isSalesPage ? "/" : "/sales"}
        className="text-blue-500 hover:text-blue-800"
      >
        {isSalesPage ? "Home" : "Sales"}
      </Link>

      <Login onLogin={onLogin} onLogout={onLogout} isLoggedIn={isLoggedIn} />
    </header>
  );
}

export default Header;
