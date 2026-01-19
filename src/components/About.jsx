import React from 'react';
import { Package, MapPin, Phone } from 'lucide-react';

const About = ({ setView }) => {
  return (
    <>
      <div className="fixed inset-0 opacity-[0.2] pointer-events-none">
        <div
          className="absolute inset-0 animate-bg-scroll-horizontal"
          style={{
            backgroundImage: `url('/Batu-bata-background.png')`,
            backgroundSize: '600px auto',
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      <section className="min-h-screen bg-slate-50 py-16 lg:py-24 px-4">
        <div className="max-w-4xl mx-auto">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-lg border border-slate-100">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 text-center">Tentang Dusun Srimulyo</h2>
          <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto text-center">
            Desa Srimulyo merupakan bagian dari Kecamatan Gondang, Kabupaten Sragen.
          </p>

          <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto text-center mt-4">
            Desa ini memiliki keunikan pada salah satu usahanya yaitu batu bata lokal yang telah lama menjadi tulang punggung
            ekonomi masyarakat desa ini.
          </p>

          <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto text-center mt-4">
            Melalui BrickMulyo, potensi lokal ini diperkenalkan agar usaha batu bata lebih dikenal oleh masyarakat luar agar
            memberi manfaat ekonomi bagi masyarakat Desa Srimulyo.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => typeof setView === 'function' ? setView('productsPage') : window.location.href = '#products'}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-3 rounded-full font-semibold shadow-sm hover:shadow-lg transition"
            >
              <Package size={16} />
              Jelajah Produk
            </button>
          </div>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-md flex items-start gap-4 border border-slate-100">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white">
              <Package size={18} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Daftar UMKM</h4>
              <p className="text-sm text-slate-600">Informasi usaha bata, pengrajin, dan kontak penjualan.</p>
            </div>
          </div>

          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-md flex items-start gap-4 border border-slate-100">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white">
              <MapPin size={18} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Kontak Langsung</h4>
              <p className="text-sm text-slate-600">Alamat dan nomor kontak untuk pemesanan dan kunjungan.</p>
            </div>
          </div>

          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-md flex items-start gap-4 border border-slate-100">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-white">
              <Phone size={18} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Pembayaran</h4>
              <p className="text-sm text-slate-600">Metode pembayaran dan informasi penawaran untuk pembelian besar.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
      <style jsx global>{`
        @keyframes bg-scroll-horizontal {
          from { background-position: 0 0; }
          to { background-position: 600px 0; }
        }

        .animate-bg-scroll-horizontal {
          animation: bg-scroll-horizontal 40s linear infinite;
        }
      `}</style>
    </>
  );
};

export default About;
 
