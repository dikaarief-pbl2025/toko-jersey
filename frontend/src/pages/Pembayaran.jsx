import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Pembayaran = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [showPopup, setShowPopup] = useState(false);
  const [userName, setUserName] = useState("Customer");

  // Ambil data user dari localStorage
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.name || "Customer");
      } catch {
        setUserName("Customer");
      }
    }
  }, []);

  const handlePaymentClick = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 dark:text-gray-300 text-lg">
          Tidak ada produk yang dipilih 😅
        </p>
        <Link
          to="/katalog"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          ‹ Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="relative p-6 text-center">
      <div className="bg-store-green py-4 rounded mb-6 shadow">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Detail Pembayaran
        </h2>
      </div>

      <div className="max-w-lg mx-auto border rounded-xl p-6 bg-white dark:bg-gray-800 shadow-md">
        <div className="flex flex-col items-center">
          <img
            src={product.image || product.img}
            alt={product.name || product.nama}
            className="mb-4 w-48 h-48 object-cover rounded-lg shadow"
          />
          <h3 className="font-semibold text-lg mb-1 dark:text-white">
            {product.name || product.nama}
          </h3>
          <p className="text-green-600 font-semibold mb-3">
            Rp. {(product.price || product.harga).toLocaleString("id-ID")}
          </p>
        </div>

        <a
          href={`https://wa.me/6288296636178?text=${encodeURIComponent(
            `Halo Admin, saya ${userName} ingin membeli ${
              product.name || product.nama
            } seharga Rp.${(product.price || product.harga).toLocaleString(
              "id-ID"
            )}.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handlePaymentClick}
          className="block w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all mt-6"
        >
          💬 Selesaikan Pembayaran via WhatsApp
        </a>

        <div className="mt-5">
          <Link to="/katalog" className="text-blue-600 hover:underline text-sm">
            ‹ Kembali ke Katalog
          </Link>
        </div>
      </div>

      {/* Popup sukses */}
      {showPopup && (
        <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-bounce">
          ✅ Transaksi berhasil dikirim ke WhatsApp!
        </div>
      )}
    </div>
  );
};

export default Pembayaran;
