import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Logo lokal
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // 🌙 Mode Gelap
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // 🔐 Cek login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token) {
      setIsLoggedIn(true);
      try {
        const parsed = JSON.parse(storedUser);
        setUserName(parsed.name || parsed.username || "User");
      } catch {
        setUserName("User");
      }
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, [location.pathname]);

  // 🧭 Scroll detection → ubah navbar jadi solid
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 flex justify-between items-center transition-all ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        {/* 🔰 Logo + Animasi */}
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-white"
        >
          <motion.img
            src={logo}
            alt="Logo Dik Store"
            className="w-10 h-10 object-contain rounded-full"
            animate={{
              scale: isScrolled ? 0.9 : 1.1,
              rotate: 0,
            }}
            whileHover={{
              rotate: 10,
              scale: 1.15,
              boxShadow: "0 0 10px rgba(22, 163, 74, 0.6)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          />

          <motion.span
            animate={{
              opacity: isScrolled ? 0.8 : 1,
              y: isScrolled ? -2 : 0,
              color: isScrolled ? "#16A34A" : "#111827",
            }}
            transition={{ duration: 0.3 }}
            className="tracking-tight dark:text-white"
          >
            Dik` Store
          </motion.span>
        </Link>

        {/* 🌐 Menu Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`hover:text-green-600 transition ${
              location.pathname === "/"
                ? "text-green-600 font-semibold"
                : "text-gray-700 dark:text-gray-200"
            }`}
          >
            Home
          </Link>
          <Link
            to="/katalog"
            className={`hover:text-green-600 transition ${
              location.pathname === "/katalog"
                ? "text-green-600 font-semibold"
                : "text-gray-700 dark:text-gray-200"
            }`}
          >
            Katalog
          </Link>

          {isLoggedIn ? (
            <>
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                Halo, <strong>{userName}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-green-600 dark:text-gray-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-green-600 dark:text-gray-200"
              >
                Register
              </Link>
            </>
          )}

          {/* ☀️ Tombol Mode */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* 📱 Tombol Menu Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800 dark:text-white"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 📜 Menu Mobile dengan animasi */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-green-600 dark:text-gray-200"
              >
                Home
              </Link>
              <Link
                to="/katalog"
                onClick={() => setMenuOpen(false)}
                className="hover:text-green-600 dark:text-gray-200"
              >
                Katalog
              </Link>

              {isLoggedIn ? (
                <>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    Halo, <strong>{userName}</strong>
                  </p>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-3 mt-2">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center py-2 rounded-lg border border-green-500 text-green-600 hover:bg-green-100 dark:text-green-400 dark:border-green-400 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                  >
                    Register
                  </Link>
                </div>
              )}

              <button
                onClick={() => {
                  setIsDark(!isDark);
                  setMenuOpen(false);
                }}
                className="w-full text-sm text-gray-700 dark:text-gray-300 mt-3 hover:text-green-600"
              >
                {isDark ? "☀️ Mode Terang" : "🌙 Mode Gelap"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
