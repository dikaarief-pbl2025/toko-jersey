import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// ====== Middleware ======
app.use(
  cors({
    origin: [
      "https://shiny-yodel-r45j6jg5gp4xfprr9-5173.app.github.dev", // Frontend React
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// ====== Koneksi Database ======
const db = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "root",
  database: process.env.DB_NAME || "toko_jersey",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Gagal konek ke database:", err);
  } else {
    console.log("✅ Terhubung ke MySQL Database!");
  }
});

// ====== REGISTER USER ======
app.post("/api/auth/register", async (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password)
    return res.status(400).json({ message: "Semua kolom wajib diisi." });

  db.query("SELECT * FROM users WHERE username = ?", [username], async (err, result) => {
    if (err) return res.status(500).json({ message: "Kesalahan server.", err });
    if (result.length > 0)
      return res.status(400).json({ message: "Username sudah digunakan." });

    try {
      const hash = await bcrypt.hash(password, 10);
      db.query(
        "INSERT INTO users (name, username, password) VALUES (?, ?, ?)",
        [name, username, hash],
        (err) => {
          if (err) return res.status(500).json({ message: "Gagal mendaftar pengguna." });
          res.status(201).json({ message: "Registrasi berhasil!" });
        }
      );
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan server." });
    }
  });
});

// ====== LOGIN USER ======
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Kolom username dan password wajib diisi." });

  db.query("SELECT * FROM users WHERE username = ?", [username], async (err, result) => {
    if (err) return res.status(500).json({ message: "Kesalahan server." });
    if (result.length === 0)
      return res.status(404).json({ message: "Username tidak ditemukan." });

    const user = result[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Password salah." });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login berhasil!",
      token,
      user: { id: user.id, name: user.name, username: user.username },
    });
  });
});

// ====== TES SERVER ======
app.get("/", (req, res) => {
  res.send("🚀 API Toko Jersey berjalan normal!");
});

// ====== JALANKAN SERVER ======
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0"; // wajib untuk Codespaces

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server berjalan di http://${HOST}:${PORT}`);
});
