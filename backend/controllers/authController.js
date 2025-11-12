import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password)
    return res.status(400).json({ msg: "Semua field wajib diisi" });

  const checkUser = "SELECT * FROM users WHERE username = ?";
  db.query(checkUser, [username], async (err, result) => {
    if (err) return res.status(500).json({ msg: "DB Error" });
    if (result.length > 0)
      return res.status(400).json({ msg: "Username sudah dipakai" });

    const hashed = await bcrypt.hash(password, 10);
    const insert = "INSERT INTO users (name, username, password) VALUES (?, ?, ?)";
    db.query(insert, [name, username, hashed], (err) => {
      if (err) return res.status(500).json({ msg: "Gagal register" });
      res.status(201).json({ msg: "Registrasi berhasil" });
    });
  });
};

export const login = (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, result) => {
    if (err) return res.status(500).json({ msg: "DB Error" });
    if (result.length === 0)
      return res.status(400).json({ msg: "Username tidak ditemukan" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Password salah" });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ msg: "Login berhasil", token });
  });
};
