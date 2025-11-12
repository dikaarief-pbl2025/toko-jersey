import React, { useState } from "react";
import { Link } from "react-router-dom";

// ✅ Import gambar lokal (nama file disamakan persis)
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
    {
      id: 1,
      nama: "Jersey Urawa Reds (J-League)",
      img: jerseyurawa,
      harga: 650000,
    },
    {
      id: 2,
      nama: "Jersey Johor Darul Ta'zim",
      img: jerseyjdt,
      harga: 630000,
    },
    {
      id: 3,
      nama: "Jersey Persib Bandung",
      img: jerseypersib,
      harga: 700000,
    },
  ],
  "Jersey Klub Eropa": [
    {
      id: 4,
      nama: "Jersey Manchester United",
      img: jerseymu,
      harga: 850000,
    },
    {
      id: 5,
      nama: "Jersey Real Madrid",
      img: jerseyrealmadrid,
      harga: 870000,
    },
  ],
  "Jersey Klub America": [
    {
      id: 6,
      nama: "Jersey LA Galaxy",
      img: jerseyla,
      harga: 790000,
    },
    {
      id: 7,
      nama: "Jersey Inter Miami CF",
      img: jerseymiami,
      harga: 800000,
    },
  ],
  "Jersey Tim Nasional": [
    {
      id: 8,
      nama: "Jersey Timnas Indonesia",
      img: jerseytimnas,
      harga: 750000,
    },
    {
      id: 9,
      nama: "Jersey Timnas Jepang",
      img: jerseytimnasjepang,
      harga: 820000,
    },
  ],
};

const Katalog = () => {
  const [aktif, setAktif] = useState("Jersey Tim Nasional");
  const [search, setSearch] = useState("");

  const produkAktif = (produkList[aktif] || []).filter((p) =>
    p.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      {/* Header + Search */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Katalog Jersey
        </h2>
        <p className="text-gray-600 text-sm mt-1 mb-4">
          Pilih kategori atau cari jersey favoritmu 🔍
        </p>

        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Cari jersey..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      {/* Layout grid utama */}
      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar kategori */}
        <aside className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-lg mb-4 dark:text-white">
            Kategori
          </h3>
          <ul className="space-y-3">
            {kategori.map((k) => (
              <li key={k}>
                <label className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-green-600 transition">
                  <input
                    type="radio"
                    name="kategori"
                    checked={aktif === k}
                    onChange={() => setAktif(k)}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <span>{k}</span>
                </label>
              </li>
            ))}
          </ul>

          <Link
            to="/"
            className="inline-block mt-6 text-blue-600 hover:underline text-sm"
          >
            ‹ Kembali
          </Link>
        </aside>

        {/* Produk grid */}
        <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produkAktif.length > 0 ? (
            produkAktif.map((p) => (
              <div
                key={p.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <img
                    src={p.img}
                    alt={p.nama}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
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

                {/* Tombol langsung tampil */}
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
        </section>
      </div>
    </section>
  );
};

export default Katalog;
