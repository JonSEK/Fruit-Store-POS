function Login({ onLogin, onLogout, isLoggedIn }) {
  // Handler for login and logout actions
  const handleAction = () => {
    if (isLoggedIn) {
      onLogout();
    } else {
      const name = prompt("Enter your name");
      onLogin(name);
    }
  };

  // Render login or logout button based on isLoggedIn state
  return (
    <button
      type="button"
      className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
      onClick={handleAction}
    >
      {isLoggedIn ? "Log out" : "Log in"}
    </button>
  );
}

export default Login;
