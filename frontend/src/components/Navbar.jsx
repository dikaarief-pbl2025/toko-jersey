import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
const logo = "https://via.placeholder.com/50x50.png?text=Logo";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // 🌙 Mode gelap / terang
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // 🔐 Cek login status dari localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token) {
      setIsLoggedIn(true);
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setUserName(parsed.name || parsed.username || "User");
        } catch {
          setUserName("User");
        }
      }
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, [location.pathname]); // cek ulang saat pindah halaman

  // 🚪 Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
          <span className="font-semibold text-lg dark:text-white">
            Dik` Store
          </span>
        </Link>

        {/* Menu utama */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-600 dark:text-gray-200">Home</Link>
          <Link to="/katalog" className="hover:text-blue-600 dark:text-gray-200">Katalog</Link>

          {isLoggedIn ? (
            <>
              <span className="text-gray-600 dark:text-gray-300">
                Halo, <strong>{userName}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600 dark:text-gray-200">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-600 dark:text-gray-200">
                Register
              </Link>
            </>
          )}

          {/* Toggle mode */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Tombol menu mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800 dark:text-white"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700 px-4 py-3 space-y-3">
          <Link to="/" className="block" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/katalog" className="block" onClick={() => setMenuOpen(false)}>Katalog</Link>

          {isLoggedIn ? (
            <>
              <p className="text-sm dark:text-gray-300">Halo, {userName}</p>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="block" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}

          <button
            onClick={() => {
              setIsDark(!isDark);
              setMenuOpen(false);
            }}
            className="block w-full text-left py-2"
          >
            {isDark ? "☀️ Mode Terang" : "🌙 Mode Gelap"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
