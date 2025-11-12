import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ✅ Import gambar lokal
import jerseyurawa from "../assets/jerseyurawa.jpg";
import jerseyjdt from "../assets/jerseyjdt.jpg";
import jerseypersib from "../assets/jerseypersib.jpg";
import jerseymu from "../assets/jerseymu.jpg";
import jerseyrealmadrid from "../assets/jerseyrealmadrid.jpg";
import jerseyla from "../assets/jerseyla.jpg";
import jerseymiami from "../assets/jerseymiami.jpg";
import jerseytimnas from "../assets/jerseytimnas.jpg";
import jerseytimnasjepang from "../assets/jerseytimnasjepang.jpg";

const kategori = [
  "Jersey Klub Asia",
  "Jersey Klub Eropa",
  "Jersey Klub America",
  "Jersey Tim Nasional",
];

const produkList = {
  "Jersey Klub Asia": [
    { id: 1, nama: "Jersey Urawa Reds (J-League)", img: jerseyurawa, harga: 650000 },
    { id: 2, nama: "Jersey Johor Darul Ta'zim", img: jerseyjdt, harga: 630000 },
    { id: 3, nama: "Jersey Persib Bandung", img: jerseypersib, harga: 700000 },
  ],
  "Jersey Klub Eropa": [
    { id: 4, nama: "Jersey Manchester United", img: jerseymu, harga: 850000 },
    { id: 5, nama: "Jersey Real Madrid", img: jerseyrealmadrid, harga: 870000 },
  ],
  "Jersey Klub America": [
    { id: 6, nama: "Jersey LA Galaxy", img: jerseyla, harga: 790000 },
    { id: 7, nama: "Jersey Inter Miami CF", img: jerseymiami, harga: 800000 },
  ],
  "Jersey Tim Nasional": [
    { id: 8, nama: "Jersey Timnas Indonesia", img: jerseytimnas, harga: 750000 },
    { id: 9, nama: "Jersey Timnas Jepang", img: jerseytimnasjepang, harga: 820000 },
  ],
};

const Katalog = () => {
  const [aktif, setAktif] = useState("Jersey Tim Nasional");
  const [search, setSearch] = useState("");
  const [produkAktif, setProdukAktif] = useState([]);

  useEffect(() => {
    setProdukAktif(
      (produkList[aktif] || []).filter((p) =>
        p.nama.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [aktif, search]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          🏷️ Katalog Jersey
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-5">
          Pilih kategori atau cari jersey favoritmu
        </p>

        {/* Input pencarian */}
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Cari jersey..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Kategori Chip */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {kategori.map((k) => (
          <button
            key={k}
            onClick={() => setAktif(k)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              aktif === k
                ? "bg-green-600 text-white shadow-md scale-105"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-800"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      {/* Produk Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produkAktif.length > 0 ? (
          produkAktif.map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col justify-between hover:-translate-y-1 hover:border-green-400"
            >
              <div>
                <img
                  src={p.img}
                  alt={p.nama}
                  className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 text-center">
                  <p className="font-semibold text-gray-800 dark:text-white mb-1">
                    {p.nama}
                  </p>
                  <p className="text-green-600 font-semibold mb-3">
                    Rp {p.harga.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              <div className="p-4 text-center mt-auto">
                <Link
                  to="/pembayaran"
                  state={{ product: p }}
                  className="block w-full bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-all"
                >
                  🛒 Beli Sekarang
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            Tidak ditemukan produk dengan kata kunci "{search}".
          </p>
        )}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          ‹ Kembali ke Beranda
        </Link>
      </div>
    </section>
  );
};

export default Katalog;
