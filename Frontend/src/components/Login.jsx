function Login({ onLogin, onLogout, isLoggedIn }) {
  const handleLogin = () => {
    const name = prompt("Enter your name");
    onLogin(name);
  };

  const handleLogout = () => {
    onLogout();
  };

  return isLoggedIn ? (
    <button
      type="button"
      className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
      onClick={handleLogout}
    >
      Log out
    </button>
  ) : (
    <button
      type="button"
      className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
      onClick={handleLogin}
    >
      Log in
    </button>
  );
}

export default Login;
