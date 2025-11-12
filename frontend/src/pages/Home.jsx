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
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(n);

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">
        Selamat Datang di Website Penjualan Jersey Bola
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg transition hover:shadow-xl"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-64 object-cover rounded mb-3"
              loading="lazy"
            />
            <h3 className="font-medium text-lg mb-1 dark:text-white">{p.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              {toIDR(p.price)}
            </p>

            {isLoggedIn ? (
              <Link
                to="/pembayaran"
                state={{ product: p }}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded inline-block transition-transform hover:scale-105"
              >
                Beli Sekarang
              </Link>
            ) : (
              <Link
                to="/login"
                state={{ from: "/pembayaran", product: p }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded inline-block transition-transform hover:scale-105"
                title="Login dulu untuk melanjutkan pembayaran"
              >
                Beli Sekarang
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
