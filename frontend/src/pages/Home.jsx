import React from "react";
import { Link } from "react-router-dom";

// Import gambar lokal
import jerseyMu from "../assets/jerseymu.jpg";
import jerseyPersib from "../assets/jerseypersib.jpg";
import jerseyTimnas from "../assets/jerseytimnas.jpg";

const Home = () => {
  const products = [
    {
      id: 1,
      name: "Jersey Timnas Official",
      image: jerseyTimnas,
      price: 750000,
    },
    {
      id: 2,
      name: "Jersey Persib Official",
      image: jerseyPersib,
      price: 780000,
    },
    {
      id: 3,
      name: "Jersey Manchester United",
      image: jerseyMu,
      price: 850000,
    },
  ];

  const isLoggedIn = !!localStorage.getItem("token");
  const toIDR = (n) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(n);

  return (
    <section className="max-w-6xl mx-auto px-6 pt-28 pb-12 text-center">
      {/* ===== Hero Section ===== */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-3">
          Selamat Datang di <span className="text-green-600">Dik` Store</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Temukan jersey klub dan tim nasional favoritmu dengan kualitas terbaik.
        </p>

        <Link
          to="/katalog"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
        >
          🛍️ Lihat Katalog
        </Link>
      </div>

      {/* ===== Produk Section ===== */}
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">
        Produk Terlaris Minggu Ini
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((p) => (
          <div
            key={p.id}
            className="p-5 bg-white dark:bg-gray-800 shadow-md rounded-2xl transition hover:shadow-xl hover:-translate-y-1"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-64 object-cover rounded-lg mb-3 transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
            <h3 className="font-semibold text-lg mb-1 dark:text-white">
              {p.name}
            </h3>
            <p className="text-green-600 font-medium mb-4">
              {toIDR(p.price)}
            </p>

            {isLoggedIn ? (
              <Link
                to="/pembayaran"
                state={{ product: p }}
                className="block w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all hover:scale-[1.02]"
              >
                🛒 Beli Sekarang
              </Link>
            ) : (
              <Link
                to="/login"
                state={{ from: "/pembayaran", product: p }}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all hover:scale-[1.02]"
                title="Login dulu untuk melanjutkan pembayaran"
              >
                🔐 Login Dulu
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
