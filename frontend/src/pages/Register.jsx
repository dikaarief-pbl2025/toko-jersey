import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 🔹 Ganti base URL sesuai backend Codespaces kamu (port 8080)
  const API_URL = "https://shiny-yodel-r45j6jg5gp4xfprr9-8080.app.github.dev";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // Pastikan response bisa dibaca sebagai JSON
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setMessage("✅ Registrasi berhasil! Silakan login.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(`❌ ${data.message || "Gagal daftar."}`);
      }
    } catch (err) {
      console.error("❌ Error saat fetch:", err);
      setMessage("❌ Terjadi kesalahan koneksi ke server.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center dark:text-white">
          Dik` Store
        </h2>
        <h3 className="text-lg font-medium mb-4 text-center dark:text-white">
          Pendaftaran Akun
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nama Lengkap"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-green-400"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-green-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-green-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded"
          >
            Registrasi
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm dark:text-gray-200">{message}</p>
        )}

        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-blue-600 hover:underline text-sm dark:text-blue-400"
          >
            Sudah punya akun? Masuk
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
